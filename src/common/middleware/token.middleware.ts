import { Injectable, UnauthorizedException, NestMiddleware } from '@nestjs/common';
import { TokenService } from '../../module/shared/services';
import { RedisDB } from '../../common/enums';
import { NextFunction, Request, Response } from 'express';
import { RedisService } from '../../module/shared/services/redis.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
	constructor(
		private readonly tokenService: TokenService,
		private readonly redisService: RedisService,
	) {}
	async use(request: Request, response: Response, next: NextFunction) {
		const token = request.cookies?.accessToken;
		if (!token) {
			throw new UnauthorizedException('Token is missing in cookie');
		}

		try {
			// Validate the JWT token and extract the payload
			if (!this.tokenService.validateAccessToken(token)) {
				throw new UnauthorizedException('Invalid or expired token');
			}

			const foundToken = await this.redisService.getValue(RedisDB.Auth, token);
			if (!foundToken) {
				throw new UnauthorizedException('Invalid or expired token');
			}
			request.user = foundToken;
		} catch {
			throw new UnauthorizedException('Invalid or expired token');
		}

		next();
	}
}
