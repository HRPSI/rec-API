import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../collection/user.model';

@Injectable()
export class UserRepository {
	constructor(@InjectModel('user') private readonly users: Model<User>) {}

	create(data: Partial<User>): Promise<User> {
		return new this.users(data).save();
	}

	findById(id: string): Promise<User | null> {
		return this.users.findById(id).exec();
	}

	findByEmail(email: string): Promise<User | null> {
		return this.users.findOne({ email: email.toLowerCase() }).exec();
	}
}
