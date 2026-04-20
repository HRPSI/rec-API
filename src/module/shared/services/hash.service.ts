import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
	// Define the number of salt rounds for bcrypt
	private readonly saltRounds = 10;

	/**
	 * Hash the given password
	 * @param password The plain text password
	 * @returns The hashed password
	 */
	async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(this.saltRounds);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	}

	/**
	 * Check if a plain password matches the hashed password
	 * @param password The plain text password
	 * @param hash The hashed password stored in the database
	 * @returns True if the passwords match, otherwise false
	 */
	async comparePassword(password: string, hash: string): Promise<boolean> {
		const isMatch = await bcrypt.compare(password, hash);
		return isMatch;
	}
}
