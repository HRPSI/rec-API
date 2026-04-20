export enum Status {
	Active = 'Active',
	Inactive = 'Inactive',
}

export enum Language {
	English = 'en',
	Arabic = 'ar',
}

export enum QueueType {
	Task = 'TASK',
	Job = 'JOB',
}

export enum QueueTargetType {
	Payroll = 'PAYROLL',
}

export enum AppType {
	Admin = 'ADMIN',
	Fleet = 'FLEET',
	Driver = 'DRIVER',
}

export enum Platform {
	Web = 'WEB',
	Mobile = 'MOBILE',
}

export enum Timezone {
	'Etc/GMT+12' = -720,
	'Pacific/Midway' = -660,
	'Pacific/Honolulu' = -600,
	'America/Juneau' = -540,
	'America/Los_Angeles' = -480,
	'America/Phoenix' = -420,
	'America/Guatemala' = -360,
	'America/Lima' = -300,
	'America/Puerto_Rico' = -240,
	'America/Montevideo' = -180,
	'Atlantic/South_Georgia' = -120,
	'Atlantic/Cape_Verde' = -60,
	'Etc/UTC' = 0,
	'Africa/Algiers' = 60,
	'Africa/Cairo' = 120,
	'Asia/Riyadh' = 180,
	'Asia/Tehran' = 210,
	'Asia/Baku' = 240,
	'Asia/Kabul' = 270,
	'Asia/Tashkent' = 300,
	'Asia/Colombo' = 330,
	'Asia/Kathmandu' = 345,
	'Asia/Almaty' = 360,
	'Asia/Rangoon' = 390,
	'Asia/Bangkok' = 420,
	'Asia/Hong_Kong' = 480,
	'Asia/Tokyo' = 540,
	'Australia/Darwin' = 570,
	'Australia/Brisbane' = 600,
	'Pacific/Noumea' = 660,
	'Pacific/Majuro' = 720,
	'Pacific/Chatham' = 765,
	'Pacific/Tongatapu' = 780,
}

export enum DeviceStatus {
	Active = 'ACTIVE',
	Inactive = 'INACTIVE',
	Blocked = 'BLOCKED',
}

export enum OsType {
	Android = 'ANDROID',
	Ios = 'IOS',
	Web = 'WEB',
	PC = 'PC',
}

export enum Environment {
	LOCAL = 'local',
	DEVELOPMENT = 'development',
	TEST = 'test',
	STAGING = 'staging',
	PRODUCTION = 'production',
}

export enum StatusCode {
	//2xx
	OK = 200,
	Created = 201,
	Accepted = 202,
	NoContent = 204,
	//4xx
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	Conflict = 409,
	Permission = 423,
	//5xx
	InternalServerError = 500,
}

export enum RequestHeaders {
	ContentType = 'content-type',
	Accept = 'accept',
	Authorization = 'authorization',
	UserAgent = 'user-agent',
	CacheControl = 'cache-control',
	ContentLength = 'content-length',
	Host = 'host',
	Referer = 'referer',
	Origin = 'origin',
	AcceptLanguage = 'accept-language',
	AcceptEncoding = 'accept-encoding',
	Cookie = 'cookie',
}

export enum MimeType {
	PDF = 'application/pdf',
	Excel = 'application/vnd.ms-excel',
	ExcelOpenXML = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	CSV = 'text/csv',
	Word = 'application/msword',
	WordOpenXML = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	JPEG = 'image/jpeg',
	PNG = 'image/png',
	GIF = 'image/gif',
	BMP = 'image/bmp',
	WebP = 'image/webp',
	Zip = 'application/zip',
	SevenZip = 'application/x-7z-compressed',
	Rar = 'application/x-rar-compressed',
	Tar = 'application/x-tar',
	GTar = 'application/x-gtar',
	BZip2 = 'application/x-bzip2',
	GZip = 'application/x-gzip',
	LZip = 'application/x-lzip',
	XZ = 'application/x-xz',
	Compress = 'application/x-compress',
	LZMA = 'application/x-lzma',
	LZOP = 'application/x-lzop',
	Snappy = 'application/x-snappy-framed',
	PlainText = 'text/plain',
	WordTemplate = 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
	WordMacroEnabledDocument = 'application/vnd.ms-word.document.macroEnabled.12',
	WordMacroEnabledTemplate = 'application/vnd.ms-word.template.macroEnabled.12',
	ExcelTemplate = 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
	ExcelMacroEnabledSheet = 'application/vnd.ms-excel.sheet.macroEnabled.12',
	ExcelMacroEnabledTemplate = 'application/vnd.ms-excel.template.macroEnabled.12',
	ExcelMacroEnabledAddin = 'application/vnd.ms-excel.addin.macroEnabled.12',
	ExcelMacroEnabledBinarySheet = 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
	PowerPoint = 'application/vnd.ms-powerpoint',
	PowerPointOpenXMLPresentation = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	PowerPointOpenXMLTemplate = 'application/vnd.openxmlformats-officedocument.presentationml.template',
	PowerPointOpenXMLSlideshow = 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
	PowerPointMacroEnabledAddin = 'application/vnd.ms-powerpoint.addin.macroEnabled.12',
	PowerPointMacroEnabledPresentation = 'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
	PowerPointMacroEnabledSlideshow = 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
	JSON = 'application/json',
	XML = 'application/xml',
	HTML = 'text/html',
	MultipartFormData = 'multipart/form-data',
}

export const ForbiddenExtensions = [
	'ade',
	'adp',
	'bat',
	'chm',
	'cmd',
	'com',
	'cpl',
	'exe',
	'hta',
	'ins',
	'isp',
	'jse',
	'lib',
	'lnk',
	'mde',
	'msc',
	'msi',
	'msp',
	'mst',
	'pif',
	'scr',
	'sct',
	'sh',
	'shb',
	'sys',
	'vb',
	'vbe',
	'vbs',
	'vxd',
	'wsc',
	'wsf',
	'wsh',
	'js',
	'jar',
	'war',
	'ear',
	'html',
	'dmg',
	'bin',
];

export enum RedisDB {
	Auth = 0,
	TwoFactorTemp = 1,
}

export enum SortDirection {
	ASC = 'ASC',
	DESC = 'DESC',
}

export enum SortBy {
	Id = 'id',
	CreatedAt = 'createdAt',
}

export enum CurrencyRateSource {
	API = 'API',
	MANUAL = 'MANUAL',
}

export enum RateTrend {
	UP = 'UP',
	DOWN = 'DOWN',
	SAME = 'SAME',
}

export enum Currency {
	USD = 'USD', // US Dollar
	SAR = 'SAR', // Saudi Riyal
	AED = 'AED', // United Arab Emirates
	EGP = 'EGP', // Egypt
	IQD = 'IQD', // Iraq
	JOD = 'JOD', // Jordan
	KWD = 'KWD', // Kuwait
	LBP = 'LBP', // Lebanon
	LYD = 'LYD', // Libya
	MAD = 'MAD', // Morocco
	OMR = 'OMR', // Oman
	QAR = 'QAR', // Qatar
	SYP = 'SYP', // Syria
	TND = 'TND', // Tunisia
	YER = 'YER', // Yemen
	EUR = 'EUR', // Euro
	GBP = 'GBP', // British Pound
	JPY = 'JPY', // Japanese Yen
	CNY = 'CNY', // Chinese Yuan
	INR = 'INR', // Indian Rupee
}

export enum ExportType {
	CSV = 'csv',
	EXCEL = 'excel',
	PDF = 'pdf',
	JSON = 'json',
}

export const dateFormats = ['MM/DD/YYYY', 'MM-DD-YYYY', 'MM.DD.YYYY', 'YYYY/DD/MM', 'YYYY-DD-MM', 'YYYY.DD.MM'];

export enum LookupType {
	PayElement = 'PAY_ELEMENT',
	PayGroup = 'PAY_GROUP',
	Country = 'COUNTRY',
	Employee = 'EMPLOYEE',
	PayrollEmployee = 'PAYROLL_EMPLOYEE',
	BankAccount = 'BANK_ACCOUNT',
	Cycle = 'CYCLE',
	CycleAdvanced = 'CYCLE_ADVANCED',
	ReportTemplate = 'REPORT_TEMPLATE',
	Payroll = 'PAYROLL',
	LegalEntity = 'LEGAL_ENTITY',
	Permission = 'PERMISSION',
	Role = 'ROLE',
}

export enum Month {
	January = 1,
	February = 2,
	March = 3,
	April = 4,
	May = 5,
	June = 6,
	July = 7,
	August = 8,
	September = 9,
	October = 10,
	November = 11,
	December = 12,
}

export enum QueueStatus {
	Queued = 'QUEUED',
	InProgress = 'IN_PROGRESS',
	Completed = 'COMPLETED',
	Failed = 'FAILED',
}

export enum FormulaVariableType {
	PayElement = 'PAY_ELEMENT',
	Employee = 'EMPLOYEE',
	LegalEntity = 'LEGAL_ENTITY',
}
