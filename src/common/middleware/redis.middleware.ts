import { RedisService } from '../../module/shared/services';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RedisMiddleware implements NestMiddleware {
	constructor(private readonly redisService: RedisService) {}

	use(req: any, res: any, next: () => void) {
		req.redisService = this.redisService; // Attach Redis client to request
		next();
	}
}
