import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository, UserDeviceRepository, UserAuditRepository } from '../data/repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { RedisService, TokenService } from '../shared/services';
import {
	Api,
	Constants,
	Env,
	ErrorCode,
	LoginResponse,
	MessageCode,
	RedisDB,

	StatusCode,
	UserActionType,
	UserStatus,
} from '@app/common';
import { buildResponse } from '@app/common/utils/response-builder';
import { TwoFactorService } from './two-factor.service';
import { UserDevice } from '../data/collection/user-device.model';

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userDeviceRepository: UserDeviceRepository,
		private readonly userAuditRepository: UserAuditRepository,
		private readonly tokenService: TokenService,
		private readonly redisService: RedisService,
		private readonly twoFactorService: TwoFactorService,
	) {}

	async registerDevice(
		dto: RegisterDeviceDto,
		accessToken?: string,
		refreshToken?: string,
	): Promise<UserDevice | null> {
		try {
			let device = await this.userDeviceRepository.getUserDeviceByDeviceId(dto.deviceId);
			if (!device) {
				device = this.userDeviceRepository.create({
					deviceId: dto.deviceId,
					osType: dto.osType,
					ip: dto.ipAddress,
					osVersion: dto.osVersion,
					deviceModel: dto.deviceModel,
					languageIsoCode: dto.languageIsoCode,
					timezone: dto.timezone,
					accessToken,
					refreshToken,
				});
			} else if (device.accessToken && device.refreshToken) {
				await this.redisService.del(RedisDB.Auth, device.accessToken);
				await this.redisService.del(RedisDB.Auth, device.refreshToken);
				device.accessToken = accessToken;
				device.refreshToken = refreshToken;
			} else {
				device.accessToken = accessToken;
				device.refreshToken = refreshToken;
			}
			return device;
		} catch {
			return null;
		}
	}

	async login(loginDto: LoginDto): Promise<any> {
		try {
			const user = await this.userRepository.getUserByEmailWithLegalEntity(loginDto.email);
			if (!user) {
				return buildResponse().code(StatusCode.Forbidden).errors(ErrorCode.WrongUsernamePassword);
			}

			if (!user.isEmailVerified || !user.isMobileNumberVerified || user.status !== UserStatus.Active) {
				return buildResponse().code(StatusCode.BadRequest).errors(ErrorCode.VerifyAccount);
			}

			const isValidPassword = await user.validatePassword(loginDto.password);
			if (!isValidPassword) {
				return buildResponse().code(StatusCode.Forbidden).errors(ErrorCode.WrongUsernamePassword);
			}

			if (user.isTwoFactorEnabled) {
				const tempToken = this.tokenService.generateAccessToken({
					id: user.id,
					type: 'TwoFactorTemp',
					deviceId: loginDto.deviceId,
					ipAddress: loginDto.ipAddress,
				});

				await this.redisService.setValue(
					RedisDB.TwoFactorTemp,
					tempToken,
					JSON.stringify({ userId: user.id }),
					'EX',
					300,
				);

				return buildResponse({ requiresTwoFactor: true, tempToken })
					.code(StatusCode.Accepted)
					.message('message.TWO_FACTOR_REQUIRED');
			}

			return this.issueSession(user, loginDto, loginDto.ipAddress);
		} catch (error) {
			throw new HttpException({ key: error?.response?.key, error }, error.status ?? 500);
		}
	}

	async refreshToken(refreshTokenValue: string): Promise<any> {
		try {
			const decodedRefresh = this.tokenService.validateRefreshToken(refreshTokenValue);
			if (!decodedRefresh || decodedRefresh.type !== 'RefreshToken') {
				return buildResponse().code(StatusCode.Forbidden).errors(ErrorCode.WrongUsernamePassword);
			}

			const user = await this.userRepository.getUserById(decodedRefresh.id);
			if (!user) {
				return buildResponse().code(StatusCode.Forbidden).errors(ErrorCode.WrongUsernamePassword);
			}

			const device = await this.userDeviceRepository.getUserDeviceByDeviceId(decodedRefresh.deviceId);
			if (!device || device.refreshToken !== refreshTokenValue) {
				return buildResponse().code(StatusCode.Forbidden).errors(ErrorCode.WrongUsernamePassword);
			}

			if (device.accessToken) await this.redisService.del(RedisDB.Auth, device.accessToken);
			if (device.refreshToken) await this.redisService.del(RedisDB.Auth, device.refreshToken);

			const accessToken = this.tokenService.generateAccessToken({ id: user.id, type: 'AccessToken' });
			const refreshToken = this.tokenService.generateRefreshToken({
				id: user.id,
				deviceId: decodedRefresh.deviceId,
				type: 'RefreshToken',
			});

			device.lastLoginAt = new Date();
			device.accessToken = accessToken;
			device.refreshToken = refreshToken;
			device.user = user._id;
			await device.save();

			const infoToken = this.tokenService.generateInfoToken({
				id: user.id,
				type: 'InfoToken',
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				deviceId: device.deviceId,
			});

			await this.redisService.setValue(
				RedisDB.Auth,
				accessToken,
				infoToken,
				'EX',
				Number(Env.JWT_ACCESS_TOKEN_EXPIRATION),
			);
			await this.redisService.setValue(
				RedisDB.Auth,
				refreshToken,
				infoToken,
				'EX',
				Number(Env.JWT_REFRESH_TOKEN_EXPIRATION),
			);

			const cookies = this.buildAuthCookies(accessToken, refreshToken);
			const resp = { ...(device.toObject ? device.toObject() : device), user };
			return buildResponse(resp, LoginResponse)
				.code(StatusCode.Accepted)
				.message(MessageCode.DEVICE_REGISTERED)
				.cookies(cookies);
		} catch (error) {
			throw new HttpException({ key: error?.response?.key, error }, error.status ?? 500);
		}
	}

	async generateTwoFactorSecret(userId: string): Promise<any> {
		try {
			const user = await this.userRepository.getUserById(userId);
			if (!user) {
				return buildResponse().code(StatusCode.NotFound).errors(ErrorCode.UserNotFound);
			}
			if (user.isTwoFactorEnabled) {
				return buildResponse().code(StatusCode.BadRequest).errors(ErrorCode.TwoFactorAlreadyEnabled);
			}

			const { secret, otpauthUrl } = this.twoFactorService.generateSecret(user.email);
			const qrCode = await this.twoFactorService.generateQrCode(otpauthUrl);

			return buildResponse({ secret, qrCode })
				.code(StatusCode.OK)
				.message('message.TWO_FACTOR_SECRET_GENERATED');
		} catch (error) {
			throw new HttpException({ key: error?.response?.key, error }, error.status ?? 500);
		}
	}

	async enableTwoFactor(userId: string, token: string, secret: string): Promise<any> {
		try {
			const user = await this.userRepository.getUserById(userId);
			if (!user) {
				return buildResponse().code(StatusCode.NotFound).errors(ErrorCode.UserNotFound);
			}
			if (user.isTwoFactorEnabled) {
				return buildResponse().code(StatusCode.BadRequest).errors(ErrorCode.TwoFactorAlreadyEnabled);
			}

			const isValid = this.twoFactorService.verifyToken(secret, token);
			if (!isValid) {
				return buildResponse().code(StatusCode.BadRequest).errors(ErrorCode.InvalidTwoFactorToken);
			}

			user.twoFactorSecret = this.twoFactorService.encryptSecret(secret);
			user.isTwoFactorEnabled = true;
			await this.userRepository.save(user);

			await this.userAuditRepository.createHistoryRecord({
				userId: user.id,
				actionType: UserActionType.TwoFactorEnabled,
				timestamp: new Date(),
				ipAddress: null,
				actionTargetId: null,
				metadata: null,
			});

			return buildResponse({ enabled: true }).code(StatusCode.OK).message('message.TWO_FACTOR_ENABLED');
		} catch (error) {
			throw new HttpException({ key: error?.response?.key, error }, error.status ?? 500);
		}
	}

	async disableTwoFactor(userId: string, token: string, password: string): Promise<any> {
		try {
			const user = await this.userRepository.getUserWithTwoFactorSecret(userId);
			if (!user) {
				return buildResponse().code(StatusCode.NotFound).errors(ErrorCode.UserNotFound);
			}
			if (!user.isTwoFactorEnabled || !user.twoFactorSecret) {
				return buildResponse().code(StatusCode.BadRequest).errors(ErrorCode.TwoFactorNotEnabled);
			}

			const userWithPassword = await this.userRepository.findByEmail(user.email);
			const isValidPassword = userWithPassword ? await userWithPassword.validatePassword(password) : false;
			if (!isValidPassword) {
				return buildResponse().code(StatusCode.Forbidden).errors(ErrorCode.WRONG_PASSWORD);
			}

			const decryptedSecret = this.twoFactorService.decryptSecret(user.twoFactorSecret);
			const isValid = this.twoFactorService.verifyToken(decryptedSecret, token);
			if (!isValid) {
				return buildResponse().code(StatusCode.BadRequest).errors(ErrorCode.InvalidTwoFactorToken);
			}

			user.twoFactorSecret = null;
			user.isTwoFactorEnabled = false;
			await this.userRepository.save(user);

			await this.userAuditRepository.createHistoryRecord({
				userId: user.id,
				actionType: UserActionType.TwoFactorDisabled,
				timestamp: new Date(),
				ipAddress: null,
				actionTargetId: null,
				metadata: null,
			});

			return buildResponse({ enabled: false }).code(StatusCode.OK).message('message.TWO_FACTOR_DISABLED');
		} catch (error) {
			throw new HttpException({ key: error?.response?.key, error }, error.status ?? 500);
		}
	}

	async verifyTwoFactorLogin(tempToken: string, token: string): Promise<any> {
		try {
			const decodedTemp = this.tokenService.validateAccessToken(tempToken);
			if (!decodedTemp || decodedTemp.type !== 'TwoFactorTemp') {
				return buildResponse().code(StatusCode.Forbidden).errors(ErrorCode.InvalidTempToken);
			}

			const tempData = await this.redisService.getValue(RedisDB.TwoFactorTemp, tempToken);
			if (!tempData) {
				return buildResponse().code(StatusCode.Forbidden).errors(ErrorCode.TempTokenExpired);
			}

			const { userId } = JSON.parse(tempData);
			const user = await this.userRepository.getUserById(userId);
			if (!user || !user.isTwoFactorEnabled) {
				return buildResponse().code(StatusCode.BadRequest).errors(ErrorCode.TwoFactorNotEnabled);
			}

			const userWithSecret = await this.userRepository.getUserWithTwoFactorSecret(userId);
			if (!userWithSecret?.twoFactorSecret) {
				return buildResponse().code(StatusCode.BadRequest).errors(ErrorCode.TwoFactorNotEnabled);
			}

			const decryptedSecret = this.twoFactorService.decryptSecret(userWithSecret.twoFactorSecret);
			const isValid = this.twoFactorService.verifyToken(decryptedSecret, token);
			if (!isValid) {
				return buildResponse().code(StatusCode.BadRequest).errors(ErrorCode.InvalidTwoFactorToken);
			}

			await this.redisService.del(RedisDB.TwoFactorTemp, tempToken);

			const deviceInput = {
				deviceId: decodedTemp.deviceId,
				ipAddress: decodedTemp.ipAddress,
			} as RegisterDeviceDto;

			return this.issueSession(user, deviceInput, decodedTemp.ipAddress, { twoFactorVerified: true });
		} catch (error) {
			throw new HttpException({ key: error?.response?.key, error }, error.status ?? 500);
		}
	}

	private async issueSession(
		user: any,
		deviceInput: RegisterDeviceDto,
		ipAddress?: string,
		auditMetadata: Record<string, any> | null = null,
	) {
		const accessToken = this.tokenService.generateAccessToken({ id: user.id, type: 'AccessToken' });
		const refreshToken = this.tokenService.generateRefreshToken({
			id: user.id,
			deviceId: deviceInput.deviceId,
			type: 'RefreshToken',
		});

		const device = await this.registerDevice(deviceInput, accessToken, refreshToken);
		if (!device) {
			return buildResponse().code(StatusCode.BadRequest).errors(ErrorCode.InvalidInput);
		}

		device.lastLoginAt = new Date();
		device.user = user._id;

		const infoToken = this.tokenService.generateInfoToken({
			id: user.id,
			type: 'InfoToken',
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			deviceId: device.deviceId,
		});

		await device.save();
		await this.redisService.setValue(
			RedisDB.Auth,
			accessToken,
			infoToken,
			'EX',
			Number(Env.JWT_ACCESS_TOKEN_EXPIRATION),
		);
		await this.redisService.setValue(
			RedisDB.Auth,
			refreshToken,
			infoToken,
			'EX',
			Number(Env.JWT_REFRESH_TOKEN_EXPIRATION),
		);

		await this.userAuditRepository.createHistoryRecord({
			userId: user.id,
			actionType: UserActionType.Login,
			timestamp: new Date(),
			ipAddress: ipAddress ?? null,
			actionTargetId: null,
			metadata: auditMetadata,
		});

		const cookies = this.buildAuthCookies(accessToken, refreshToken);
		const resp = { ...(device.toObject ? device.toObject() : device), user };

		return buildResponse(resp, LoginResponse)
			.code(StatusCode.Accepted)
			.message(MessageCode.DEVICE_REGISTERED)
			.cookies(cookies);
	}

	private buildAuthCookies(accessToken: string, refreshToken: string) {
		return {
			accessToken: {
				value: accessToken,
				httpOnly: true,
				secure: Constants.COOKIE_SECURE,
				sameSite: Constants.COOKIE_SAME_SITE,
				path: `/api/`,
				maxAge: Number(Env.JWT_ACCESS_TOKEN_EXPIRATION) * 1000,
			},
			refreshToken: {
				value: refreshToken,
				httpOnly: true,
				secure: Constants.COOKIE_SECURE,
				sameSite: Constants.COOKIE_SAME_SITE,
				path: `/api/${Api.AUTH_PATH}/${Api.REFRESH_TOKEN_PATH}`,
				maxAge: Number(Env.JWT_REFRESH_TOKEN_EXPIRATION) * 1000,
			},
		};
	}
}
