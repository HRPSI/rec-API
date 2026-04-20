import { Env } from '@app/common';
import { Environment } from '@app/common/enums';


export const configuration = () => ({
	database: {
		host: Env.DB_HOST,
		port: Env.DB_PORT ? parseInt(Env.DB_PORT) : 5432,
		username: Env.DB_USERNAME,
		password: Env.DB_PASSWORD,
		name: Env.DB_NAME,
		schema: Env.DB_SCHEMA,
	},
	api: {
		url: Env.API_URL,
		key: Env.API_KEY,
	},
	auth: {
		jwtSecret: Env.JWT_SECRET,
		accessTokenSecret: Env.JWT_ACCESS_TOKEN_SECRET,
		refreshTokenSecret: Env.JWT_REFRESH_TOKEN_SECRET,
		accessTokenExpiration: Env.JWT_ACCESS_TOKEN_EXPIRATION,
		refreshTokenExpiration: Env.JWT_REFRESH_TOKEN_EXPIRATION,
		authSecret: Env.AUTH_SECRET,
		authExpiresIn: Env.AUTH_EXPIRES_IN ? parseInt(Env.AUTH_EXPIRES_IN) : 3600,
	},
	rateLimit: {
		ttl: parseInt(Env.RATE_LIMIT_TIME_TO_LIVE as string),
		limit: parseInt(Env.RATE_LIMIT_NO_OF_REQUESTS as string),
	},
	app: {
		Env: Env.NODE_ENV || Environment.DEVELOPMENT,
		port: Env.APP_PORT ? parseInt(Env.APP_PORT) : 3000,
	},
});
