import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
	ACCESS_COOKIE,
	REFRESH_COOKIE,
	clearAuthCookies,
	setAuthCookies,
} from '../../common/utils/cookie.util';

@Controller('auth')
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@Post('register')
	async register(
		@Body() dto: RegisterDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const tokens = await this.auth.register(dto);
		setAuthCookies(res, tokens.accessToken, tokens.refreshToken, tokens.accessTtlSeconds, tokens.refreshTtlSeconds);
		return { success: true };
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(
		@Body() dto: LoginDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const tokens = await this.auth.login(dto);
		setAuthCookies(res, tokens.accessToken, tokens.refreshToken, tokens.accessTtlSeconds, tokens.refreshTtlSeconds);
		return { success: true };
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const refreshToken = req.cookies?.[REFRESH_COOKIE];
		if (!refreshToken) throw new UnauthorizedException('Missing refresh token');

		try {
			const tokens = await this.auth.refresh(refreshToken);
			setAuthCookies(res, tokens.accessToken, tokens.refreshToken, tokens.accessTtlSeconds, tokens.refreshTtlSeconds);
			return { success: true };
		} catch (err) {
			clearAuthCookies(res);
			throw err;
		}
	}

	@Post('logout')
	@HttpCode(HttpStatus.NO_CONTENT)
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const accessToken = req.cookies?.[ACCESS_COOKIE];
		const refreshToken = req.cookies?.[REFRESH_COOKIE];
		await this.auth.logout(accessToken, refreshToken);
		clearAuthCookies(res);
	}
}
