import { StatusCode } from '../../common';

interface CookieOptions {
	value: string;
	httpOnly?: boolean;
	secure?: boolean;
	sameSite?: 'lax' | 'strict' | 'none';
	path?: string;
	maxAge?: number;
}

export interface IResponse {
	code: StatusCode;
	message?: string;
	data?: any;
	errors?: any;
	totalCount?: number;
	keepOk?: boolean;
	sse?: boolean;
	cookies?: Record<string, CookieOptions>;
}
export interface IResponseBuilder {
	response: IResponse;
	code(code: StatusCode): IResponseBuilder;
	code(code: StatusCode, keepOk: boolean): IResponseBuilder;
	message(message: string): IResponseBuilder;
	errors(errors: any): IResponseBuilder;
	totalCount(totalCount: number): IResponseBuilder;
	sse(): IResponseBuilder;
	cookies(cookies: any): IResponseBuilder;
}
