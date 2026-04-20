import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
// import { RedisDB } from '../enums';
import { Env } from '../constants';
import { TokenPayload } from '../interfaces';
// import { RedisService } from '@app/module/shared/services/redis.service';

// Custom decorator to inject decoded token
export const GetDecodedToken = createParamDecorator(async (_data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	// const redisService: RedisService = request.redisService; // Inject Redis Client

	// const accessToken = request.cookies?.accessToken; // Get token from header
	// if (!accessToken) {
	// 	throw new Error('Access token is missing');
	// }

	// // Retrieve info token from Redis using access token as key
	// const infoToken = await redisService.getValue(RedisDB.Auth, accessToken);
	// if (!infoToken) {
	// 	throw new Error('Invalid or expired token');
	// }

	// Decode the token
	try {
		if (!request.user.id) {
			if (!Env.JWT_ACCESS_INFO_SECRET) {
				throw new Error('JWT_ACCESS_INFO_SECRET is not configured');
			}
			let decoded = jwt.verify(request.user, Env.JWT_ACCESS_INFO_SECRET) as unknown as TokenPayload;
			decoded = { ...decoded, accessToken: request.user };
			request.user = decoded;
			return decoded;
		} else {
			return request.user;
		}
	} catch {
		throw new Error('Failed to decode token');
	}
});
