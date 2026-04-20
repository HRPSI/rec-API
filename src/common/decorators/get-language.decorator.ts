import { Language, RequestHeaders } from '../../common/enums';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetLanguage = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	return request.headers[RequestHeaders.AcceptLanguage] || Language.English;
});
