import { IsOptional, IsString } from 'class-validator';

export class RegisterDeviceDto {
	@IsString()
	deviceId: string;

	@IsOptional()
	@IsString()
	ipAddress?: string;

	@IsOptional()
	@IsString()
	osType?: string;

	@IsOptional()
	@IsString()
	osVersion?: string;

	@IsOptional()
	@IsString()
	deviceModel?: string;

	@IsOptional()
	@IsString()
	languageIsoCode?: string;

	@IsOptional()
	@IsString()
	timezone?: string;
}
