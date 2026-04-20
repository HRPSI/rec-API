import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAudit } from '../collection/user-audit.model';
import { UserActionType } from '@app/common';

export interface HistoryRecordInput {
	userId: string;
	actionType: UserActionType;
	timestamp: Date;
	ipAddress?: string | null;
	actionTargetId?: string | null;
	metadata?: Record<string, any> | null;
}

@Injectable()
export class UserAuditRepository {
	constructor(@InjectModel('user_audit') private readonly audits: Model<UserAudit>) {}

	createHistoryRecord(input: HistoryRecordInput): Promise<UserAudit> {
		return new this.audits({
			user: input.userId,
			actionType: input.actionType,
			timestamp: input.timestamp,
			ipAddress: input.ipAddress ?? null,
			actionTargetId: input.actionTargetId ?? null,
			metadata: input.metadata ?? null,
		}).save();
	}
}
