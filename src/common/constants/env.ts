import * as dotenv from 'dotenv';

export default class Env {
	public static DOT_ENV = dotenv.config();
	public static DB_HOST = process.env.DB_HOST;
	public static DB_PORT = process.env.DB_PORT;
	public static DB_USERNAME = process.env.DB_USERNAME;
	public static DB_PASSWORD = process.env.DB_PASSWORD;
	public static DB_NAME = process.env.DB_NAME;
	public static DB_SCHEMA = process.env.DB_SCHEMA;
	public static DB_SSL = process.env.DB_SSL;

	// API Configuration
	public static API_URL = process.env.API_URL;
	public static API_KEY = process.env.API_KEY;
	public static PAYROLL_ENGINE_URL = process.env.PAYROLL_ENGINE_URL;

	// Exchange Rate API Configuration
	public static EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;

	// Authentication Configuration
	public static JWT_SECRET = process.env.JWT_SECRET;
	public static JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
	public static JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
	public static JWT_ACCESS_TOKEN_EXPIRATION = process.env.JWT_ACCESS_TOKEN_EXPIRATION;
	public static JWT_REFRESH_TOKEN_EXPIRATION = process.env.JWT_REFRESH_TOKEN_EXPIRATION;
	public static AUTH_SECRET = process.env.AUTH_SECRET;
	public static AUTH_EXPIRES_IN = process.env.AUTH_EXPIRES_IN;
	public static JWT_ACCESS_INFO_SECRET = process.env.JWT_ACCESS_INFO_SECRET;
	public static JWT_SHORT_TOKEN_EXPIRATION = process.env.JWT_SHORT_TOKEN_EXPIRATION;
	public static REDIS_URl = process.env.REDIS_URl;
	public static REDIS_PASSWORD = process.env.REDIS_PASSWORD;
	public static REDIS_DB = process.env.REDIS_DB;
	public static BULLMQ_REDIS_DB = process.env.BULLMQ_REDIS_DB;

	// Application Configuration
	public static NODE_ENV = process.env.NODE_ENV;
	public static APP_DEBUG = process.env.APP_DEBUG;
	public static APP_PORT = process.env.APP_PORT;
	public static DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD;

	// File Upload Configuration
	public static AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
	public static AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
	public static AWS_REGION = process.env.AWS_REGION;
	public static S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

	//Queue Configuration
	public static EXPORT_QUEUE = process.env.EXPORT_QUEUE;
	public static PAYROLL_QUEUE = process.env.PAYROLL_QUEUE;

	// Elasticsearch Configuration
	public static ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL;
	public static ELASTICSEARCH_USERNAME = process.env.ELASTICSEARCH_USERNAME;
	public static ELASTICSEARCH_PASSWORD = process.env.ELASTICSEARCH_PASSWORD;

	// Mongo Configuration
	public static MONGO_HOST = process.env.MONGO_HOST;
	public static MONGO_USER = process.env.MONGO_USER;
	public static MONGO_PASSWORD = process.env.MONGO_PASSWORD;
	public static MONGO_DATABASE = process.env.MONGO_DATABASE;

	// Rate Limit Configuration
	public static RATE_LIMIT_TIME_TO_LIVE = process.env.RATE_LIMIT_TIME_TO_LIVE;
	public static RATE_LIMIT_NO_OF_REQUESTS = process.env.RATE_LIMIT_NO_OF_REQUESTS;
}
