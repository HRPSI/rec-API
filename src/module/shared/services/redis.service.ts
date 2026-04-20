import { RedisDB } from '@app/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
@Injectable()
export class RedisService {
	constructor(@InjectRedis() private readonly redisClient: Redis) {}

	// Store a value in Redis
	async setValue(dbIndex: number, key: string, value: string, meta?: any, expiresIn?: any): Promise<void> {
		await this.redisClient.select(dbIndex);
		if (expiresIn) {
			await this.redisClient.set(key, value, meta, expiresIn);
		} else {
			await this.redisClient.set(key, value);
		}
	}

	// Retrieve a value from Redis
	async getValue(dbIndex: number, key: string): Promise<string | null> {
		await this.redisClient.select(dbIndex);
		return await this.redisClient.get(key);
	}

	async del(dbIndex: number, key: string): Promise<void> {
		await this.redisClient.select(dbIndex);
		await this.redisClient.del(key);
	}

	pipeline(db: RedisDB) {
		const client = this.redisClient.duplicate(); //this.getClient(db);
		client.select(db);
		return client.pipeline();
	}
}
