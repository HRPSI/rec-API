import * as dotenv from 'dotenv';
import Env from './env';
import { Environment } from '../enums';

const isSecureCookieEnv =
	Env.NODE_ENV === Environment.TEST || Env.NODE_ENV === Environment.STAGING || Env.NODE_ENV === Environment.PRODUCTION;
const authCookieSameSite: 'lax' | 'none' = isSecureCookieEnv ? 'none' : 'lax';

export class Constants {
	public static DOT_ENV = dotenv.config();
	public static API_VERSION = 'v1';
	// Headers
	public static headers = {
		lang: 'lang',
		xPoweredBy: 'x-powered-by',
	};

	public static DATABASE = {
		TINY_LENGTH: 10,
		SMALL_LENGTH: 100,
		DEFAULT_LENGTH: 255,
		MEDIUM_LENGTH: 500,
		LARGE_LENGTH: 1000,
		EXTRA_LARGE_LENGTH: 4000,
	};
	// Regular Expressions
	public static EMAIL_REGEX =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	public static PHONE_NUMBER_REGEX = /^(\+20|0020)?1(0|1|2|5)[0-9]{8}$/;
	public static PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%+.*_?&#-]{8,15}$/;
	public static COMPLEX_PASSWORD_REGEX =
		/^(?!.*madar|Madar)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%+.*_?&#-]{8,15}$/;
	public static VALIDATION_REGEX_PASSWORD =
		/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,20})/;
	public static VALIDATION_USERNAME = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
	public static ALPHABETIC_REGEX = /^[A-Za-z\s]+$/;
	public static MINIMUM_PHONE_REGEX = /^(\+?\d{9,25})$/;
	public static ROLE_NAME_REGEX = /^[A-Za-z]{3}[A-Za-z0-9\-]{0,17}$/;

	// Authentication and JWT
	public static AUTH_HEADER_KEY = 'authorization';
	public static AUTH_TYPE = 'Bearer';

	// Pagination
	public static LIMIT = 10;
	public static PAGE = 0;

	public static BASIC_FIELDS_INTERNAL_CODES = {
		FIRST_NAME: 'first_name',
		LAST_NAME: 'last_name',
		FULL_NAME: 'full_name',
		HIRING_DATE: 'hiring_date',
		TERMINATION_DATE: 'termination_date',
		JOB_TITLE: 'job_title',
		EMPLOYEE_ID: ['ee_id', 'employee_id', 'id'],
		BIRTH_DATE: 'birth_date',
		HAS_DISABILITY: 'has_disability',
	};

	public static JOB_CONFIG = {
		attempts: 3, // Number of retry attempts
		backoff: { type: 'exponential', delay: 2000 }, // Retry delay with exponential backoff
		priority: 1, // Job priority (lower number = higher priority)
		timeout: 120 * 1000, // Timeout for the job in milliseconds
		removeOnComplete: true, // Automatically remove the job from the queue when completed
		removeOnFail: false, // Keep failed jobs in the queue for debugging
		stackTraceLimit: 10, // Limit the number of stack traces stored for failed jobs
	};

	public static QUEUE_CONNECTION_STATUS = {
		PAYROLL_QUEUE: {
			connected: false,
			message: 'UNKNOWN',
		},
	};

	public static COOKIE_SECURE = isSecureCookieEnv;
	public static COOKIE_SAME_SITE = authCookieSameSite;
}
