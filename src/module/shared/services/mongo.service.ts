import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class MongoService {
	constructor(
		@InjectConnection() private readonly connection: Connection,
	) {}


	async checkConnection() {
		try {
			const state = this.connection.readyState;
			return state === 1; // 1 means connected
		} catch (error) {
			throw error;
		}
	}
}
