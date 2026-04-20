import { Schema, Document } from 'mongoose';

export const ExceptionSchema = new Schema({
	timestamp: { type: Date },
	url: { type: String },
	method: { type: String },
	ip: { type: String },
	userAgent: { type: String },
	statusCode: { type: Number },
	responseTime: { type: Number },
	requestBody: { type: String },
	responseBody: { type: String },
	userId: { type: String },
	userEmail: { type: String },
	isFixed: { type: Boolean, default: false },
	legalEntityId: { type: Number },
	countryId: { type: Number },
	query: { type: Object },
	params: { type: Object },
	headers: { type: Object },
	extra: { type: Object },
	error: { type: String },
	name: { type: String },
	stack: { type: String },
	host: { type: String },
	hostname: { type: String },
	payload: { type: Object },
});

export interface Exception extends Document {
	timestamp: Date;
	url: string;
	method: string;
	ip: string;
	userAgent: string;
	statusCode: number;
	responseTime: number;
	requestBody: string;
	responseBody: string;
	userId: string;
	userEmail: string;
	isFixed: boolean;
	legalEntityId?: number;
	countryId?: number;
	query: any;
	params: any;
	headers: any;
	extra?: any;
	error: string;
	name: string;
	stack: string;
	host: string;
	hostname: string;
	payload?: any;
}
