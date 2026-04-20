import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { EnableTwoFactorDto, DisableTwoFactorDto, VerifyTwoFactorDto } from './dto/two-factor.dto';
import { Api } from '@app/common';
import { GetDecodedToken } from '@app/common/decorators';

@Controller(Api.AUTH_PATH)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post(Api.LOGIN_PATH)
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto);
	}

	@Post(Api.REFRESH_TOKEN_PATH)
	refresh(@Req() req: Request) {
		const refreshToken = req.cookies?.refreshToken ?? req.body?.refreshToken;
		return this.authService.refreshToken(refreshToken);
	}

	@Post(Api.TWO_FACTOR_GENERATE)
	generateTwoFactor(@GetDecodedToken() user: any) {
		return this.authService.generateTwoFactorSecret(user?.id);
	}

	@Post(Api.TWO_FACTOR_ENABLE)
	enableTwoFactor(@GetDecodedToken() user: any, @Body() dto: EnableTwoFactorDto) {
		return this.authService.enableTwoFactor(user?.id, dto.token, dto.secret);
	}

	@Post(Api.TWO_FACTOR_DISABLE)
	disableTwoFactor(@GetDecodedToken() user: any, @Body() dto: DisableTwoFactorDto) {
		return this.authService.disableTwoFactor(user?.id, dto.token, dto.password);
	}

	@Post(Api.TWO_FACTOR_VERIFY)
	verifyTwoFactor(@Body() dto: VerifyTwoFactorDto) {
		return this.authService.verifyTwoFactorLogin(dto.tempToken, dto.token);
	}
}
