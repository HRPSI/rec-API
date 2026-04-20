import { RedisModuleOptions } from '@nestjs-modules/ioredis';
import { Env } from '@app/common';

export const ioredisConfig: RedisModuleOptions = {
	type: 'single',
	url: Env.REDIS_URl ?? 'redis://127.0.0.1:6379',
	options: {
		password: Env.REDIS_PASSWORD || undefined,
		db: Number(Env.REDIS_DB) || 0,
	},
};
