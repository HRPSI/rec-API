import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { I18nService, I18nContext } from 'nestjs-i18n';
import { IResponseBuilder } from '../../common/response';
import { StatusCode } from '../../common/enums';

/**
 * Global response formatting interceptor.
 *
 * 1. For regular HTTP requests, it converts the internal `IResponseBuilder` into the
 *    final JSON structure (with i18n message / error translation).
 * 2. For Server-Sent Events (`@Sse()`), it short-circuits and forwards the payload
 *    directly so that Nest streams the event to the client unchanged.
 */
@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
	private readonly logger = new Logger(GlobalResponseInterceptor.name);

	constructor(private readonly i18n: I18nService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp();
		const res = ctx.getResponse();

		// Skip file / binary downloads – we don't want to alter those responses.
		if (res.getHeader('Content-Type')?.includes('application/octet-stream') || res.getHeader('Content-Disposition')) {
			return next.handle();
		}

		return next.handle().pipe(
			mergeMap((data: IResponseBuilder) => {
				// ---------------------------------------------------------------------
				// 1) Server-Sent Events: forward the payload as-is (already JSON-serialisable)
				// ---------------------------------------------------------------------
				if (data?.response?.sse) {
					return of(JSON.stringify(data.response));
				}

				// ---------------------------------------------------------------------
				// 2) Normal HTTP response: translate & build final structure (async)
				// ---------------------------------------------------------------------
				return from(this.buildStandardResponse(data, context));
			}),
		);
	}

	/** Builds the final JSON response object for standard HTTP requests. */
	private async buildStandardResponse(data: IResponseBuilder, context: ExecutionContext) {
		const i18nContext = I18nContext.current(context);
		const responseObj: any = {
			statusCode: data?.response?.code || StatusCode.OK,
		};

		// Localised success message ------------------------------------------------
		if (data?.response?.message) {
			responseObj.message = await this.i18n.translate(data.response.message, {
				lang: i18nContext?.lang,
				defaultValue: await this.i18n.translate('message.SUCCESS', { lang: i18nContext?.lang }),
			});
			responseObj.success = true;
			delete data.response.message;
		}

		// Localised error message --------------------------------------------------
		if (data?.response?.errors) {
			const translatedError = await this.i18n.translate(data.response.errors, {
				lang: i18nContext?.lang,
			});
			responseObj.errors = [translatedError];
			responseObj.success = false;
			delete data.response.errors;
		}

		// Attach data if present ---------------------------------------------------
		if (data?.response?.data !== undefined) {
			responseObj.data = data.response.data;
		}

		// Finalise -----------------------------------------------------------------
		const http = context.switchToHttp();
		const res = http.getResponse();
		const req = http.getRequest();

		// Set cookies if present
		if (data?.response?.cookies) {
			Object.entries(data.response.cookies).forEach(([name, options]: [string, any]) => {
				const { value, ...cookieOptions } = options;
				res.cookie(name, value, cookieOptions);
			});
			delete responseObj.cookies;
			delete data.response.cookies;
		}

		res.status(data?.response?.keepOk ? StatusCode.OK : responseObj.statusCode);

		this.logger.verbose(`${req.method} ${req.originalUrl ?? req.url} -> ${JSON.stringify(responseObj)}`);
		return responseObj;
	}
}
