import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import Redis from 'ioredis';
import { Env } from '../../common';
import { InjectRedisClient } from '../../common/utils/redis.client';

export type TokenKind = 'access' | 'refresh';

export interface TokenPayload {
	sub: string;
	email: string;
	jti: string;
	type: TokenKind;
}

export interface IssuedTokens {
	accessToken: string;
	refreshToken: string;
	accessTtlSeconds: number;
	refreshTtlSeconds: number;
}

const ACCESS_DEFAULT_TTL = 15 * 60; // 15 minutes
const REFRESH_DEFAULT_TTL = 7 * 24 * 60 * 60; // 7 days

@Injectable()
export class TokenService {
	constructor(
		private readonly jwt: JwtService,
		@InjectRedisClient() private readonly redis: Redis,
	) {}

	async issueTokens(userId: string, email: string): Promise<IssuedTokens> {
		const accessJti = randomUUID();
		const refreshJti = randomUUID();
		const accessTtlSeconds = this.parseTtl(Env.JWT_ACCESS_TOKEN_EXPIRATION, ACCESS_DEFAULT_TTL);
		const refreshTtlSeconds = this.parseTtl(Env.JWT_REFRESH_TOKEN_EXPIRATION, REFRESH_DEFAULT_TTL);

		const accessToken = this.jwt.sign(
			{ sub: userId, email, jti: accessJti, type: 'access' } as TokenPayload,
			{ secret: Env.JWT_ACCESS_TOKEN_SECRET, expiresIn: accessTtlSeconds },
		);
		const refreshToken = this.jwt.sign(
			{ sub: userId, email, jti: refreshJti, type: 'refresh' } as TokenPayload,
			{ secret: Env.JWT_REFRESH_TOKEN_SECRET, expiresIn: refreshTtlSeconds },
		);

		const pipeline = this.redis.multi();
		pipeline.set(this.accessKey(accessJti), userId, 'EX', accessTtlSeconds);
		pipeline.set(this.refreshKey(refreshJti), userId, 'EX', refreshTtlSeconds);
		pipeline.sadd(this.userAccessSet(userId), accessJti);
		pipeline.sadd(this.userRefreshSet(userId), refreshJti);
		pipeline.expire(this.userAccessSet(userId), refreshTtlSeconds);
		pipeline.expire(this.userRefreshSet(userId), refreshTtlSeconds);
		await pipeline.exec();

		return { accessToken, refreshToken, accessTtlSeconds, refreshTtlSeconds };
	}

	async verifyAccess(token: string): Promise<TokenPayload> {
		const payload = this.verify(token, Env.JWT_ACCESS_TOKEN_SECRET, 'access');
		const stored = await this.redis.get(this.accessKey(payload.jti));
		if (!stored || stored !== payload.sub) throw new UnauthorizedException('Session expired');
		return payload;
	}

	async rotateRefresh(token: string): Promise<IssuedTokens> {
		const payload = this.verify(token, Env.JWT_REFRESH_TOKEN_SECRET, 'refresh');
		const stored = await this.redis.get(this.refreshKey(payload.jti));

		if (!stored) {
			// Token verified but no session => replay/stolen token. Revoke all user sessions.
			await this.revokeAllForUser(payload.sub);
			throw new UnauthorizedException('Refresh token reuse detected');
		}
		if (stored !== payload.sub) {
			await this.revokeAllForUser(payload.sub);
			throw new UnauthorizedException('Invalid refresh token');
		}

		// Atomic revoke of the used refresh token before issuing new ones.
		const deleted = await this.redis.del(this.refreshKey(payload.jti));
		if (!deleted) {
			// Lost the race against a concurrent use -> treat as reuse.
			await this.revokeAllForUser(payload.sub);
			throw new UnauthorizedException('Refresh token reuse detected');
		}
		await this.redis.srem(this.userRefreshSet(payload.sub), payload.jti);

		return this.issueTokens(payload.sub, payload.email);
	}

	async revokeSession(accessJti: string | null, refreshJti: string | null, userId: string) {
		const pipeline = this.redis.multi();
		if (accessJti) {
			pipeline.del(this.accessKey(accessJti));
			pipeline.srem(this.userAccessSet(userId), accessJti);
		}
		if (refreshJti) {
			pipeline.del(this.refreshKey(refreshJti));
			pipeline.srem(this.userRefreshSet(userId), refreshJti);
		}
		await pipeline.exec();
	}

	async revokeAllForUser(userId: string): Promise<void> {
		const [accessJtis, refreshJtis] = await Promise.all([
			this.redis.smembers(this.userAccessSet(userId)),
			this.redis.smembers(this.userRefreshSet(userId)),
		]);
		const pipeline = this.redis.multi();
		for (const jti of accessJtis) pipeline.del(this.accessKey(jti));
		for (const jti of refreshJtis) pipeline.del(this.refreshKey(jti));
		pipeline.del(this.userAccessSet(userId));
		pipeline.del(this.userRefreshSet(userId));
		await pipeline.exec();
	}

	decodeRefresh(token: string): TokenPayload | null {
		try {
			return this.verify(token, Env.JWT_REFRESH_TOKEN_SECRET, 'refresh');
		} catch {
			return null;
		}
	}

	decodeAccess(token: string): TokenPayload | null {
		try {
			return this.verify(token, Env.JWT_ACCESS_TOKEN_SECRET, 'access');
		} catch {
			return null;
		}
	}

	private verify(token: string, secret: string | undefined, expectedType: TokenKind): TokenPayload {
		let payload: TokenPayload;
		try {
			payload = this.jwt.verify<TokenPayload>(token, { secret });
		} catch {
			throw new UnauthorizedException('Invalid token');
		}
		if (payload.type !== expectedType || !payload.jti || !payload.sub) {
			throw new UnauthorizedException('Invalid token');
		}
		return payload;
	}

	private parseTtl(value: string | undefined, fallback: number): number {
		if (!value) return fallback;
		const n = Number(value);
		return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
	}

	private accessKey(jti: string) {
		return `auth:at:${jti}`;
	}
	private refreshKey(jti: string) {
		return `auth:rt:${jti}`;
	}
	private userAccessSet(userId: string) {
		return `auth:user:${userId}:ats`;
	}
	private userRefreshSet(userId: string) {
		return `auth:user:${userId}:rts`;
	}
}
