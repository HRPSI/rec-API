import { Inject, Logger, OnModuleDestroy, Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { Env } from '../constants';

export const REDIS_CLIENT = Symbol('AUTH_REDIS_CLIENT');

export const RedisClientProvider: Provider = {
	provide: REDIS_CLIENT,
	useFactory: (): Redis => {
		const logger = new Logger('RedisClient');
		const client = new Redis(Env.REDIS_URl ?? 'redis://127.0.0.1:6379', {
			password: Env.REDIS_PASSWORD || undefined,
			db: Number(Env.REDIS_DB) || 0,
			lazyConnect: false,
			maxRetriesPerRequest: 3,
		});
		client.on('error', (err) => logger.error(`Redis error: ${err.message}`));
		return client;
	},
};

export const InjectRedisClient = () => Inject(REDIS_CLIENT);

export class RedisClientOwner implements OnModuleDestroy {
	constructor(@Inject(REDIS_CLIENT) private readonly client: Redis) {}
	async onModuleDestroy() {
		await this.client.quit();
	}
}
