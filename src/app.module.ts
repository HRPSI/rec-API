import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { DataModule } from './module/data/data.module';
import { SharedModule } from './module/shared/shared.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'path';
import { Api, Env, GlobalResponseInterceptor, Language } from './common';
import * as fs from 'fs';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: Language.English,
      // Choose dev path (ts-node: src/i18n) or build path (dist/i18n)
      loaderOptions: {
        path: fs.existsSync(path.join(__dirname, 'i18n'))
          ? path.join(__dirname, 'i18n')
          : path.join(__dirname, '..', 'i18n'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    MongooseModule.forRoot(
      Env.MONGO_HOST ?? `mongodb://localhost:27017/${Env.MONGO_DATABASE ?? 'recruitment'}`,
      {
        user: Env.MONGO_USER,
        pass: Env.MONGO_PASSWORD,
        dbName: Env.MONGO_DATABASE,
      },
    ),
    DataModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
