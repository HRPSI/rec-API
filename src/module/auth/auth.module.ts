import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TwoFactorService } from './two-factor.service';
import { DataModule } from '../data/data.module';
import { HashService, RedisService, TokenService } from '../shared/services';

@Module({
	imports: [DataModule, JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService, TwoFactorService, TokenService, HashService, RedisService],
	exports: [AuthService, TokenService, HashService, RedisService],
})
export class AuthModule {}
