import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../data/repository/user.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { IssuedTokens, TokenService } from './token.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly users: UserRepository,
		private readonly tokens: TokenService,
	) {}

	async register(dto: RegisterDto): Promise<IssuedTokens> {
		const existing = await this.users.findByEmail(dto.email);
		if (existing) throw new ConflictException('Email already registered');

		const password = await bcrypt.hash(dto.password, 12);
		const user = await this.users.create({
			email: dto.email.toLowerCase(),
			password,
			firstName: dto.firstName,
			lastName: dto.lastName,
		});

		return this.tokens.issueTokens(String(user._id), user.email);
	}

	async login(dto: LoginDto): Promise<IssuedTokens> {
		const user = await this.users.findByEmail(dto.email);
		// Always run bcrypt compare to avoid user enumeration via timing.
		const hash = user?.password ?? '$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvali';
		const ok = await bcrypt.compare(dto.password, hash);
		if (!user || !ok) throw new UnauthorizedException('Invalid credentials');

		return this.tokens.issueTokens(String(user._id), user.email);
	}

	async refresh(refreshToken: string): Promise<IssuedTokens> {
		return this.tokens.rotateRefresh(refreshToken);
	}

	async logout(accessToken: string | undefined, refreshToken: string | undefined): Promise<void> {
		const accessPayload = accessToken ? this.tokens.decodeAccess(accessToken) : null;
		const refreshPayload = refreshToken ? this.tokens.decodeRefresh(refreshToken) : null;
		const userId = refreshPayload?.sub ?? accessPayload?.sub;
		if (!userId) return;

		await this.tokens.revokeSession(
			accessPayload?.jti ?? null,
			refreshPayload?.jti ?? null,
			userId,
		);
	}
}
