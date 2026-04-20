// import { Env } from '@app/common';
// import { Environment } from '@app/common/enums';
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { config } from 'dotenv';
// import { join } from 'path';
// import { DataSource } from 'typeorm';

// config();

// export const typeOrmModuleOptions: TypeOrmModuleOptions = {
// 	type: 'postgres',
// 	host: Env.DB_HOST,
// 	port: parseInt(<string>Env.DB_PORT),
// 	username: Env.DB_USERNAME,
// 	password: Env.DB_PASSWORD,
// 	database: Env.DB_NAME,
// 	schema: Env.DB_SCHEMA,
// 	entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
// 	synchronize: false,
// 	autoLoadEntities: true,
// 	logging: 'all',
// 	logger: Env.NODE_ENV !== Environment.PRODUCTION ? 'advanced-console' : 'simple-console',
// 	migrationsTableName: 'migrations',
// 	migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
// };

// export const OrmConfig = {
// 	...typeOrmModuleOptions,
// };

// export const dataSource = new DataSource({
// 	type: 'postgres',
// 	host: Env.DB_HOST,
// 	port: parseInt(<string>Env.DB_PORT),
// 	username: Env.DB_USERNAME,
// 	password: Env.DB_PASSWORD,
// 	database: Env.DB_NAME,
// 	schema: Env.DB_SCHEMA,
// 	entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
// 	logging: 'all',
// 	logger: Env.NODE_ENV !== Environment.PRODUCTION ? 'advanced-console' : 'simple-console',
// 	migrationsTableName: 'migrations',
// 	migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
// });

// export default OrmConfig;
