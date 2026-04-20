// src/users/dto/user-response.dto.ts
import { Expose, Type } from 'class-transformer';
import { Status } from '../../enums/general';
import { UserTypes } from '../../enums/users';
import { UserDeviceResponse } from './user-device.response';

export class UserResponse {
	@Expose()
	id: string;

	@Expose()
	firstName: string;

	@Expose()
	lastName: string;

	@Expose()
	email: string;

	@Expose()
	phoneNumber: string;

	@Expose()
	status: Status;

	@Expose()
	userType: UserTypes;

	@Expose()
	isDeleted: boolean;

	@Expose()
	@Type(() => UserDeviceResponse)
	userDevices: UserDeviceResponse[];

	// Exclude the password field from the response
	@Expose({ toPlainOnly: true })
	password?: string;
}
