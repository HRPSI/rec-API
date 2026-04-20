import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		password: { type: String, required: true },
		firstName: { type: String },
		lastName: { type: String },
	},
	{ timestamps: true },
);

export interface User extends Document {
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
	createdAt: Date;
	updatedAt: Date;
}
