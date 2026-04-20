import { Schema, Document, Types } from 'mongoose';

export const UserDeviceSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'user' },
		deviceId: { type: String, required: true, unique: true, index: true },
		osType: { type: String },
		osVersion: { type: String },
		deviceModel: { type: String },
		ip: { type: String },
		languageIsoCode: { type: String },
		timezone: { type: String },
		accessToken: { type: String },
		refreshToken: { type: String },
		lastLoginAt: { type: Date },
	},
	{ timestamps: true },
);

export interface UserDevice extends Document {
	id: string;
	user: Types.ObjectId | any;
	deviceId: string;
	osType?: string;
	osVersion?: string;
	deviceModel?: string;
	ip?: string;
	languageIsoCode?: string;
	timezone?: string;
	accessToken?: string;
	refreshToken?: string;
	lastLoginAt?: Date;
	createdAt: Date;
	updatedAt: Date;
}
