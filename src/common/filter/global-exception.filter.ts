import { ErrorCode, Language, RequestHeaders, StatusCode } from '../enums';
import { IResponse } from '../response';
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { ExceptionsRepository } from '../../module/data/repository/exceptions.repository';

interface IErrorDetails {
	name: string;
	message: string;
	stack?: string;
	code?: string;
	timestamp: string;
	extra?: any;
	payload?: any;
}

interface IExceptionData {
	legalEntityId?: number;
	countryId?: number;
	timestamp: Date;
	url: string;
	method: string;
	ip?: string;
	host: string;
	hostname: string;
	userAgent: string;
	statusCode: number;
	responseTime: number;
	requestBody: string;
	responseBody: string;
	userId: string;
	userEmail: string;
	isFixed: boolean;
	query: any;
	params: any;
	headers: any;
	extra?: any;
	error: string;
	name: string;
	stack?: string;
	payload?: any;
}

@Catch()
export class GlobalExceptionFilter<T extends Error> implements ExceptionFilter {
	constructor(
		private readonly i18n: I18nService,
		// private readonly logger: Logger,
		private readonly exceptionsRepository: ExceptionsRepository,
	) {}

	private readonly logger = new Logger(GlobalExceptionFilter.name);
	async catch(exception: T, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const request = context.getRequest<Request>();
		const response = context.getResponse<Response>();
		const startTime = Date.now();

		const code = (exception as any).status || HttpStatus.INTERNAL_SERVER_ERROR;
		const errorDetails: IErrorDetails = {
			name: exception['response']?.error?.name || exception.name,
			message: exception['response']?.error?.message || exception.message,
			extra: exception['response']?.error?.extra,
			payload: exception['response']?.error?.payload,
			stack: exception.stack,
			code: (exception as any).code,
			timestamp: new Date().toISOString(),
		};

		// Get translated error message
		let message;
		try {
			if (code === HttpStatus.NOT_FOUND) {
				message = await this.i18n.translate(ErrorCode.NOT_FOUND, {
					lang: request.headers[RequestHeaders.AcceptLanguage] as Language,
				});
			} else if (code === HttpStatus.UNAUTHORIZED) {
				message = await this.i18n.translate(ErrorCode.UNAUTHORIZED_USER, {
					lang: request.headers[RequestHeaders.AcceptLanguage] as Language,
				});
			} else if (code === HttpStatus.BAD_REQUEST) {
				const messages = exception['response'].message;
				if (messages && messages.length && Array.isArray(messages)) {
					message = await Promise.all(
						messages.map(async (element) => {
							return await this.i18n.translate(element, {
								lang: request.headers[RequestHeaders.AcceptLanguage] as Language,
							});
						}),
					);
				} else {
					message = await this.i18n.translate(messages, {
						lang: request.headers[RequestHeaders.AcceptLanguage] as Language,
					});
				}
			} else if (code === StatusCode.Forbidden) {
				message = await this.i18n.translate(ErrorCode.ResourcePermissionDenied, {
					lang: request.headers[RequestHeaders.AcceptLanguage] as Language,
				});
			} else {
				message = await this.i18n.translate(ErrorCode.INTERNAL_SERVER_ERROR, {
					lang: request.headers[RequestHeaders.AcceptLanguage] as Language,
				});
			}
		} catch (translationError) {
			this.logger.error('Translation error:', translationError);
			message = errorDetails.message;
		}

		const errorResponse: IResponse = {
			code,
			errors: [message],
		};

		const errorStack = exception.stack || '';
		const functionMatch = errorStack.match(/at\s+(\w+\.\w+)\s+\(/);
		const functionName = functionMatch ? functionMatch[1] : 'Unknown Function';
		const requestDuration = Date.now() - startTime;

		const logContext = {
			error: {
				name: errorDetails.name,
				message: errorDetails.message,
				code: errorDetails.code,
				functionName,
			},
			request: {
				method: request.method,
				url: request.url,
				headers: this.sanitizeHeaders(request.headers),
				body: this.sanitizeBody(request.body),
				params: request.params,
				query: request.query,
				ip: request.ip,
				userAgent: request.get('user-agent'),
			},
			response: {
				statusCode: code,
				duration: `${requestDuration}ms`,
				errors: errorResponse.errors,
			},
			timestamp: errorDetails.timestamp,
		};

		this.logger.error(JSON.stringify(logContext, null, 2), exception.name);

		this.logger.error(
			`\n\n========================= ＥＸＣＥＰＴＩＯＮ ============================\n
${errorDetails.name}: ${errorDetails.message}
Debug: ${exception.stack
				?.split('\n')[1]
				?.trim()
				?.split('\\')
				?.pop()
				?.replace(/:\d+:\d+\)$/, '')} ==> ${functionName}() ==> Line:${
				exception.stack
					?.split('\n')[1]
					?.trim()
					?.match(/\:(\d+)\:(\d+)/)?.[1] || 'unknown'
			}
Request: ${request.method} ${request.url}
Duration: ${requestDuration}ms\n
=========================================================================\n`,
		);

		const exceptionData: IExceptionData = {
			timestamp: new Date(),
			url: request.url,
			method: request.method,
			ip: request.ip,
			host: request.get('host') || '',
			hostname: request.get('hostname') || '',
			userAgent: request.get('user-agent') || '',
			statusCode: code,
			query: request.query,
			params: request.params,
			headers: this.sanitizeHeaders(request.headers),
			error: errorDetails.message,
			name: errorDetails.name,
			stack: exception.stack,
			responseTime: requestDuration,
			requestBody: JSON.stringify(this.sanitizeBody(request.body)),
			responseBody: JSON.stringify(errorResponse),
			userId: errorDetails.payload?.id || '',
			userEmail: errorDetails.payload?.email || '',
			isFixed: false,
			extra: errorDetails.extra,
			payload: errorDetails.payload,
		};

		await this.exceptionsRepository.createException(exceptionData as any);

		response.status(code).json(errorResponse);
	}

	private sanitizeHeaders(headers: any): any {
		const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
		const sanitized = { ...headers };
		sensitiveHeaders.forEach((header) => {
			if (sanitized[header]) {
				sanitized[header] = '[REDACTED]';
			}
		});
		return sanitized;
	}

	private sanitizeBody(body: any): any {
		if (!body) {
			return body;
		}

		const sensitiveFields = ['password', 'token', 'apiKey', 'secret'];
		const sanitized = { ...body };

		Object.keys(sanitized).forEach((key) => {
			if (sensitiveFields.some((field) => key.toLowerCase().includes(field))) {
				sanitized[key] = '[REDACTED]';
			}
		});

		return sanitized;
	}
}
