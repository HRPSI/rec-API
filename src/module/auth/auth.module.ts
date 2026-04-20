import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DataModule } from '../data/data.module';
import { RedisClientOwner, RedisClientProvider } from '../../common/utils/redis.client';
import { TokenService } from './token.service';

@Module({
	imports: [DataModule, JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService, TokenService, RedisClientProvider, RedisClientOwner],
	exports: [TokenService],
})
export class AuthModule {}
