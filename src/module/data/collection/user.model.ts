import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '@app/common';

export const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		password: { type: String, required: true, select: false },
		firstName: { type: String },
		lastName: { type: String },
		mobileNumber: { type: String },
		isEmailVerified: { type: Boolean, default: false },
		isMobileNumberVerified: { type: Boolean, default: false },
		status: { type: String, enum: Object.values(UserStatus), default: UserStatus.Active },
		twoFactorSecret: { type: String, default: null, select: false },
		isTwoFactorEnabled: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

UserSchema.pre<User>('save', async function (next: (err?: Error) => void) {
	if (!this.isModified('password')) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
	if (!this.password) return false;
	return bcrypt.compare(password, this.password);
};

export interface User extends Document {
	id: string;
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
	mobileNumber?: string;
	isEmailVerified: boolean;
	isMobileNumberVerified: boolean;
	status: UserStatus;
	twoFactorSecret?: string | null;
	isTwoFactorEnabled: boolean;
	createdAt: Date;
	updatedAt: Date;
	validatePassword(password: string): Promise<boolean>;
}
