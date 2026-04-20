// src/users/dto/user-device-response.dto.ts
import { Expose } from 'class-transformer';
import { Language, Status } from '../../enums/general';

export class UserDeviceResponse {
	@Expose()
	deviceId: string;

	@Expose()
	deviceModel?: string;

	@Expose()
	osType?: string;

	@Expose()
	osVersion?: string;

	@Expose()
	appVersion?: string;

	@Expose()
	notificationToken?: string;

	@Expose()
	ipAddress?: string;

	@Expose()
	timezone?: string;

	@Expose()
	languageIsoCode: Language;

	@Expose()
	status: Status;
}
