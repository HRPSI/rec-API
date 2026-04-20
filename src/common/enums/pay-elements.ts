export enum PayElementUnit {
	Amount = 'AMOUNT',
	Percentage = 'PERCENTAGE',
	Quantity = 'QUANTITY',
	Hour = 'HOUR',
	Day = 'DAY',
	Week = 'WEEK',
	Month = 'MONTH',
	Annual = 'ANNUAL',
	BiWeek = 'BI_WEEK',
	Unit = 'UNIT',
	Rate = 'RATE',
}

export enum CalculationType {
	ProRata = 'PRO_RATA',
	LumpSum = 'LUMP_SUM',
}

export enum AccrualResetType {
	AnniversaryMonth = 'ANNIVERSARY_MONTH',
	FiscalYearEndMonth = 'FISCAL_YEAR_END_MONTH',
	TaxYearEndMonth = 'TAX_YEAR_END_MONTH',
	January = 'JANUARY',
	February = 'FEBRUARY',
	March = 'MARCH',
	April = 'APRIL',
	May = 'MAY',
	June = 'JUNE',
	July = 'JULY',
	August = 'AUGUST',
	September = 'SEPTEMBER',
	November = 'NOVEMBER',
	December = 'DECEMBER0',
}

// This will be used in the frontend to display the prorating method
// they are here of needed in response messages or reports
export enum ProratingMethodDictionary {
	A = 'Work days divided by actual days worked',
	B = 'Work days divided by actual days worked (including days off) (statutory holidays)',
	C = 'Flat 30 days a month divided by days worked (30 days minus days off) (including days off)',
}
// This will be used in the DB and what will be received from frontend
export enum ProratingMethod {
	A = 'A',
	B = 'B',
	C = 'C',
}

export enum OccurrenceType {
	Recurring = 'RECURRING',
	Additional = 'ADDITIONAL',
	Amount = 'AMOUNT',
}

export enum PayElementType {
	Earnings = 'EARNING',
	Deduction = 'DEDUCTION',
	Contribution = 'CONTRIBUTION',
	Rate = 'RATE',
	Unit = 'UNIT',
	Cumulative = 'CUMULATIVE',
}

export enum AccountType {
	Expense = 'EXPENSE',
	Liability = 'LIABILITY',
}

export enum PaymentPeriodicity {
	DAILY = 'daily',
	WEEKLY = 'weekly',
	MONTHLY = 'monthly',
	YEARLY = 'yearly',
}

export enum BalanceType {
	Debit = 'DEBIT',
	Credit = 'CREDIT',
}

export enum SalaryPayElementStatus {
	Active = 'ACTIVE',
	Payrolled = 'PAYROLLED',
	Expired = 'EXPIRED',
}

export enum PayElementSortBy {
	Id = 'id',
	CreatedAt = 'createdAt',
	Name = 'name',
	Account = 'account',
	CounterAccount = 'counterAccount',
	PayUnit = 'payUnit',
	Type = 'type',
	AccountType = 'accountType',
	BalanceType = 'balanceType',
	Taxable = 'taxable',
	Occurrence = 'occurrence',
}

export enum PayElementHistorySortBy {
	CreatedAt = 'createdAt',
	ElementId = 'elementId',
	Action = 'action',
	FieldName = 'fieldName',
	UserId = 'userId',
	UserName = 'userName',
	UserEmail = 'userEmail',
}
