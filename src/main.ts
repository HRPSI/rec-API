import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Constants } from './common/constants/constants';
import helmet from 'helmet';

import { Environment } from './common/enums';
import { Env } from './common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ElasticService } from '@app/module/shared/services/elastic-search.service';
import { MongoService } from './module/shared/services/mongo.service';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { validateEnv } from '@app/config';
const logger = new Logger('bootstrap', { timestamp: true });
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
const result = validateEnv();
	if (!result.isValid) {
		logger.error(result.message);
	} else {
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });
  app.disable(Constants.headers.xPoweredBy);

  app.use(helmet());
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://payroll-test.hrpsi.com',
      'https://payroll.hrpsi.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable set cookie in the browser for CORS requests with credentials,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('ProServ Recruitment API')
    .setDescription('API documentation for Recruitment application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      Constants.AUTH_HEADER_KEY,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const environment = Env.NODE_ENV as Environment;
  if (environment !== Environment.PRODUCTION) {
    SwaggerModule.setup('api-docs', app, document); // Swagger UI available at /api-docs
  }

  await app.listen(Env.APP_PORT || 3000);
  logger.verbose(`

  ########  ########  ######  ########  ##     ## #### ######## 
  ##     ## ##       ##    ## ##     ## ##     ##  ##     ##    
  ##     ## ##       ##       ##     ## ##     ##  ##     ##    
  ########  ######   ##       ########  ##     ##  ##     ##    
  ##   ##   ##       ##       ##   ##   ##     ##  ##     ##    
  ##    ##  ##       ##    ## ##    ##  ##     ##  ##     ##    
  ##     ## ########  ######  ##     ##  #######  ####    ##    

			
`);
  logger.log(`
🌐 Server:         Listening at http://localhost:${Env.APP_PORT}
📅 Start Time:     ${new Date().toLocaleString()}
📦 Environment:    ${Env.NODE_ENV}
🍃 Node Version:   ${process.version}
💾 Redis:     	   ${Env.REDIS_URl}
📊 MongoDB:        ${Env.MONGO_HOST}:27017/${Env.MONGO_DATABASE}

🚦 Queue Status:
${Object.entries(Constants.QUEUE_CONNECTION_STATUS)
  .map(
    ([name, status]) =>
      `   ${status.connected ? '✅' : '❌'} ${name}: ${status.message}`,
  )
  .join('\n')}
${await getMongoStatus(app)}
============================================================
		🚀 APPLICATION RUNNING SUCCESSFULLY
============================================================ 
`);
}}
bootstrap();

async function getMongoStatus(app: NestExpressApplication) {
	const mongoService = app.get(MongoService);
	try {
		const isConnected = await mongoService.checkConnection();
		if (isConnected) {
			return '✅ MongoDB is connected and ready';
		} else {
			return '❌ MongoDB connection failed';
		}
	} catch (error) {
		return '❌ MongoDB connection failed: ' + error.message;
	}
}
