export default class Api {
	public static readonly API_VERSION = 'v1';

	// CRUD Endpoints
	public static readonly CREATE_PATH = '/create';
	public static readonly SAVE_PATH = '/save';
	public static readonly SAVE_BULK_PATH = '/save-bulk';
	public static readonly LIST_PATH = '/list';
	public static readonly UPDATE_PATH = '/update';
	public static readonly DELETE_PATH = '/delete';

	public static readonly TRANSFER = '/transfer';
	public static readonly EXPORT = '/export';
	public static readonly CLONE = 'clone';
	public static readonly MOVE = 'move';
	public static readonly HISTORY = 'history';
	public static readonly SUMMARY = '/summary';

	// Params and Queries
	public static readonly BY_ID_PATH = '/:id';
	public static readonly ID_PARAM = 'id';
	public static readonly SEARCH_QUERY = 'searchTerm';
	public static readonly PAGE_QUERY = 'page';
	public static readonly LIMIT_QUERY = 'limit';

	// Users Routes
	public static readonly USERS_PATH = `${Api.API_VERSION}/users`;
	public static readonly REGISTER_USER = 'register';
	public static readonly ACTIVATE = 'activate';
	public static readonly UPDATE_PASSWORD_PATH = 'update-password';

	// Employees Routes
	public static readonly EMPLOYEES_PATH = `${Api.API_VERSION}/employees`;
	public static readonly EMPLOYEE = 'employee';
	public static readonly EMPLOYEE_BASIC_INFO = 'basic-info';
	public static readonly EMPLOYEE_FIELD_GROUP_DATA = 'employee-data';
	public static readonly EMPLOYEE_TERMINATION_DATA = 'employee-termination-data';
	public static readonly UPLOAD_EMPLOYEE_FIELD_GROUP_DATA = 'upload-employee-data';
	public static readonly UPLOAD_EMPLOYEE_TERMINATION_DATA = 'upload-employee-termination-data';
	public static readonly GENERATE_EMPLOYEE_EXCEL = 'generate-employee-excel';
	public static readonly EMPLOYEE_FIELDS_COLUMN = 'employee-fields-column';
	public static readonly SEPARATION_FIELDS_COLUMN = 'separation-fields-column';
	public static readonly UPDATE_EMPLOYEE_STATUS = 'update-status';
	public static readonly PRE_ATTACHMENTS_UPLOAD = 'pre-attachments-upload';
	public static readonly BULK_ATTACHMENTS_UPLOAD = 'bulk-attachment-upload';
	public static readonly EMPLOYEE_SALARY = 'employee-salary';
	public static readonly DELETE_EMPLOYEE_SALARY = 'employee-salary/:id';
	public static readonly EMPLOYEE_SALARY_BULK_PREVIEW = 'employee-salary/bulk-preview';
	public static readonly EMPLOYEE_SALARY_BULK_UPLOAD = 'employee-salary/bulk-upload';

	// Authentication Routes
	public static readonly AUTH_TAG = 'Auth';
	public static readonly AUTH_PATH = `${Api.API_VERSION}/auth`;
	public static readonly LOGIN_PATH = 'login';
	public static readonly REFRESH_TOKEN_PATH = 'refresh-token';
	public static readonly LOGOUT_PATH = 'logout';
	public static readonly RESET_PASSWORD = 'reset-password';
	public static readonly FORGET_PASSWORD = 'forget-password';
	public static readonly REGISTER_DEVICE_PATH = 'register-device';
	public static readonly VERIFY_EMAIL = 'verify-email';
	public static readonly ACTIVE_USER = 'active_user';
	public static readonly IS_PUBLIC_KEY = 'isPublic';
	public static readonly TWO_FACTOR_GENERATE = '2fa/generate';
	public static readonly TWO_FACTOR_ENABLE = '2fa/enable';
	public static readonly TWO_FACTOR_DISABLE = '2fa/disable';
	public static readonly TWO_FACTOR_VERIFY = '2fa/verify';

	// Shared Routes
	public static readonly SHARED_TAG = 'Shared';
	public static readonly SHARED_PATH = `${Api.API_VERSION}/shared`;
	public static readonly COUNTRY_LIST = `/country/list`;
	public static readonly MEDIA_LIST = `/media/list`;
	public static readonly UPLOAD_FILE = `/upload-file`;
	public static readonly UPLOAD_FILES = `/upload-files`;
	public static readonly UPLOAD_FILES_WITH_METADATA = `/upload-files-with-metadata`;
	public static readonly LOOKUP = `/lookup`;
	public static readonly REPORT_TEMPLATES = `/report-templates`;
	public static readonly REPORT_TEMPLATE_BY_ID = `/report-template`;
	public static readonly REPORT_TEMPLATE_CREATE_UPDATE = `/report-templates/create-update`;
	public static readonly REPORT_TEMPLATE_COLUMNS = `/report-templates/columns`;
	public static readonly EXPORT_REPORTS = `/export-reports`;
	public static readonly EMPLOYEE_LIST_VIEW_TEMPLATES = `/employee-list-templates`;
	public static readonly EMPLOYEE_LIST_VIEW_TEMPLATE = `/employee-list-template`;
	public static readonly EMPLOYEE_LIST_VIEW_TEMPLATE_CREATE_UPDATE = `/employee-list-template/create-update`;
	public static readonly EMPLOYEE_LIST_VIEW_TEMPLATE_HEADERS = `/employee-list-template/headers`;

	// Legal Entity Routes
	public static readonly LEGAL_ENTITY_TAG = 'Legal Entity';
	public static readonly LEGAL_ENTITY_PATH = `${Api.API_VERSION}/legal-entity`;
	public static readonly LEGAL_ENTITY_DATA = 'legal-entity-data';

	// Pay Elements Routes
	public static readonly PAY_ELEMENT_TAG = 'Pay Element';
	public static readonly PAY_ELEMENT_PATH = `${Api.API_VERSION}/pay-element`;

	// Field Group Routes
	public static readonly FIELD_GROUP_PATH = `${Api.API_VERSION}/field-group`;
	public static readonly FIELD_GROUP_TAG = 'Field Group';
	public static readonly FIELD_GROUP_ROW_PATH = `list/row`;
	public static readonly FIELD_GROUP_SUBGROUP_ORDERS_PATH = `order`;
	public static readonly SEPARATION_FIELD_GROUP_PATH = `${Api.API_VERSION}/separation-field-group`;
	public static readonly SEPARATION_FIELD_GROUP_TAG = 'Separation Field Group';

	// Bank Account Routes
	public static readonly BANK_ACCOUNT_PATH = `${Api.API_VERSION}/bank-account`;
	public static readonly BANK_ACCOUNT_TAG = 'Bank Account';

	// Pay Group Routes
	public static readonly PAY_GROUP_PATH = `${Api.API_VERSION}/pay-group`;
	public static readonly PAY_GROUP_TAG = 'Pay Group';
	public static readonly ASSIGN_PATH = 'assign';
	public static readonly GET_EMPLOYEE_PAY_GROUP_PATH = 'employee-pay-group';
	public static readonly BULK_PATH_PREVIEW = 'bulk-preview';
	public static readonly BULK_PATH_UPLOAD = 'bulk-upload';

	//Fiscal Year Routes
	public static readonly FISCAL_YEAR_PATH = `${Api.API_VERSION}/fiscal-year`;
	public static readonly FISCAL_YEAR_TAG = 'Fiscal Year';

	// Field Routes
	public static readonly FIELD_PATH = `${Api.API_VERSION}/field`;
	public static readonly FIELD_TAG = 'Field';

	// Option Mapper Routes
	public static readonly OPTION_MAPPER_PATH = `${Api.API_VERSION}/option-mapper`;
	public static readonly OPTION_MAPPER_TAG = 'Option Mapper';

	// Validator Routes
	public static readonly VALIDATOR_PATH = `${Api.API_VERSION}/validator`;
	public static readonly VALIDATOR_TAG = 'Validator';

	// Queue Routes
	public static readonly QUEUE_PATH = `${Api.API_VERSION}/queue`;
	public static readonly QUEUE_TAG = 'Queue';

	// New field added
	public static readonly SEPARATION_FIELD_PATH = `${Api.API_VERSION}/separation-field`;

	// Legal Entity Field Group Routes
	public static readonly LEGAL_ENTITY_FIELD_GROUP_PATH = `${Api.API_VERSION}/legal-entity-field-group`;
	public static readonly LEGAL_ENTITY_FIELD_GROUP_TAG = 'Legal Entity Field Group';

	// Legal Entity Field Routes
	public static readonly LEGAL_ENTITY_FIELD_PATH = `${Api.API_VERSION}/legal-entity-field`;
	public static readonly LEGAL_ENTITY_FIELD_TAG = 'Legal Entity Field';

	// Cost Center Routes
	public static readonly COST_CENTER_PATH = `${Api.API_VERSION}/cost-center`;
	public static readonly COST_CENTER_TAG = 'Cost Center';

	// General Ledger Code Routes
	public static readonly GENERAL_LEDGER_CODE_PATH = `${Api.API_VERSION}/general-ledger-code`;
	public static readonly GENERAL_LEDGER_CODE_TAG = 'General Ledger Code';

	// Currency Rate Routes
	public static readonly CURRENCY_RATE_PATH = `${Api.API_VERSION}/currency-rate`;
	public static readonly CURRENCY_RATE_TAG = 'Currency Rate';
	public static readonly CURRENCY_RATE_TRIGGER_SYNC = 'trigger-sync';
	public static readonly CURRENCY_RATE_MANUAL = 'manual-rate';
	public static readonly CURRENCY_RATE_LATEST = 'latest';
	public static readonly CURRENCY_RATE_HISTORY = 'history';
	public static readonly CURRENCY_RATE_CONVERT = 'convert';

	// Payroll Routes
	public static readonly PAYROLL_PATH = `${Api.API_VERSION}/payroll`;
	public static readonly PAYROLL_TAG = 'Payroll';
	public static readonly PERIOD_PATH = 'period';
	public static readonly PAYROLL_SETTING_PATH = 'payroll-settings';
	public static readonly START_PATH = 'start';
	public static readonly INPROGRESS_PATH = 'inprogress';
	public static readonly CLOSED_PATH = 'closed';
	public static readonly PAYROLL_HISTORY_PATH = 'history';
	public static readonly PAYROLL_EMPLOYEES_PATH = '/payroll-employees';
	public static readonly AVAILABLE_EMPLOYEES_PATH = 'available-employees';
	public static readonly SELECTED_EMPLOYEES_PATH = 'selected-employees/sse';
	public static readonly GET_PRECALCULATED_EMPLOYEES_PATH = 'precalculated-employees';
	public static readonly GET_CALCULATED_EMPLOYEES_PATH = 'calculated-employees';
	public static readonly CURRENT_PERIOD_PATH = 'current-period';
	public static readonly PAYROLL_EMPLOYEES_BY_ID_PATH = 'payroll-employees';
	public static readonly CALCULATE_PAYROLL_PATH = 'calculate';
	public static readonly GET_PROGRESS_PATH = 'progress';
	public static readonly MARK_AS_COMPLETED_PATH = 'mark-as-completed';
	public static readonly CYCLE_PATH = 'cycle';
	public static readonly RUN_PATH = 'run';
	public static readonly PERIOD_CYCLE_PATH = 'period-cycle';
	public static readonly OPEN_NEXT_PERIOD_PATH = '/open-next';
	public static readonly PAYSLIP_DOWNLOAD_PATH = '/:payrollId/payslip/:employeeReference';
	public static readonly PAYROLL_REPORT_DATA_PATH = '/:payrollId/report/data';
	public static readonly PAYROLL_REPORT_EXCEL_PATH = '/:payrollId/report';
	public static readonly PAYROLL_METADATA_PATH = '/:payrollId/employee/:employeeReference/metadata';
	public static readonly COMPARE_PAYROLL_PATH = 'compare';
	public static readonly EMPLOYEE_YTD_PATH = 'employee-ytd';
	public static readonly ROLLBACK_PATH = 'rollback';
	public static readonly RUNS_PATH = 'runs';

	// Announcement Routes
	public static readonly ANNOUNCEMENT_PATH = `${Api.API_VERSION}/announcement`;
	public static readonly ANNOUNCEMENT_TAG = 'Announcement';

	// Release Notes Routes
	public static readonly RELEASE_NOTES_PATH = `${Api.API_VERSION}/release-notes`;
	public static readonly RELEASE_NOTES_TAG = 'Release Notes';

	// Notification Routes
	public static readonly NOTIFICATION_PATH = `${Api.API_VERSION}/notification`;
	public static readonly NOTIFICATION_TAG = 'Notification';
	public static readonly USER_NOTIFICATIONS = 'user-notifications';
	public static readonly MARK_AS_READ = 'mark-as-read';

	// Regulation Routes
	public static readonly REGULATION_PATH = `${Api.API_VERSION}/regulation`;
	public static readonly REGULATION_TAG = 'Regulation';
}
