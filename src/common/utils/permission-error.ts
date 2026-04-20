import { HttpException } from '@nestjs/common';
import { StatusCode } from '../enums';

export class PermissionException extends HttpException {
	constructor(message = 'Permission out of sync') {
		super(message, StatusCode.Permission); // 423
	}
}
