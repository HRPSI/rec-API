import { IsString } from 'class-validator';

export class EnableTwoFactorDto {
	@IsString()
	token: string;

	@IsString()
	secret: string;
}

export class DisableTwoFactorDto {
	@IsString()
	token: string;

	@IsString()
	password: string;
}

export class VerifyTwoFactorDto {
	@IsString()
	tempToken: string;

	@IsString()
	token: string;
}
