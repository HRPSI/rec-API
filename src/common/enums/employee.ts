export enum EmployeeSourceFieldGroup {
	Parent = 'PARENT',
	Outsource = 'OUTSOURCE',
}

export enum EmployeeStatus {
	Active = 'ACTIVE',
	InActive = 'INACTIVE',
	Drafted = 'DRAFTED',
	Terminated = 'TERMINATED',
}

export enum ImportEmployeeErrorCodes {
	RequiredError = 'Required Error',
	OptionMapperMatchError = 'OptionMapper Miss match',
	InvalidDate = 'Invalid Date Format',
	InvalidNumber = 'Invalid Number',
}

export enum importValuesExamples {
	Date = '1/12/2025',
	Number = '0-999999',
	Text = '0-9 or A-Z',
}

export enum EmployeeCreationType {
	Import = 'IMPORT',
	Manual = 'MANUAL',
}

export enum EmployeeActivationType {
	Manual = 'MANUAL',
	Automatic = 'AUTOMATIC',
}

export enum EmployeeDateField {
	HiringDate = 'hiringDate',
	TerminationDate = 'terminationDate',
}

export enum EmployeeHistorySortBy {
	Id = 'id',
	CreatedAt = 'createdAt',
	FieldName = 'fieldName',
	InternalCode = 'internalCode',
	OldValue = 'oldValue',
	NewValue = 'newValue',
	UserEmail = 'userEmail',
	UserName = 'userName',
	ActionId = 'actionId',
}

export enum EmployeeSalarySortBy {
	NAME = 'name',
	ID = 'id',
	REFERENCE_CODE = 'employeeReference',
	SALARY_AMOUNT = 'periodicAmount',
	SALARY_START_DATE = 'startDate',
	SALARY_END_DATE = 'endDate',
	SALARY_CURRENCY = 'currency',
	SALARY_OCCURRENCE = 'occurrence',
	SALARY_PAY_ACCOUNT = 'payAccount',
	SALARY_IS_GROSS_UP = 'isGrossUp',
	SALARY_PAY_UNIT = 'payUnit',
	SALARY_NAME = 'salaryName',
	SALARY_TYPE = 'type',
	CREATED_AT = 'createdAt',
	UPDATED_AT = 'updatedAt',
}
