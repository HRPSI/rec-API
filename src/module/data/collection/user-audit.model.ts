import { Schema, Document, Types } from 'mongoose';
import { UserActionType } from '@app/common';

export const UserAuditSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'user', index: true },
		actionType: { type: String, enum: Object.values(UserActionType), required: true },
		timestamp: { type: Date, default: () => new Date() },
		ipAddress: { type: String, default: null },
		actionTargetId: { type: String, default: null },
		metadata: { type: Schema.Types.Mixed, default: null },
	},
	{ timestamps: true },
);

export interface UserAudit extends Document {
	user: Types.ObjectId | string;
	actionType: UserActionType;
	timestamp: Date;
	ipAddress?: string | null;
	actionTargetId?: string | null;
	metadata?: Record<string, any> | null;
}
