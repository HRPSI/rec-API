export enum Periodicity {
	Monthly = 'monthly',
	BiWeekly = 'bi-weekly',
	Weekly = 'weekly',
	Daily = 'daily',
}

export enum CycleType {
	Regular = 'regular',
	Advance = 'advance',
	OffCycle = 'off_cycle',
}

export enum PayrollMethod {
	Bank = 'bank',
	Check = 'check',
	Cash = 'cash',
}

export enum NormalizationMode {
	Full = 'full',
	Partial = 'partial',
	None = 'none',
}

export enum DaysInPeriod {
	Monthly = 30,
	BiWeekly = 14,
	Weekly = 7,
	Daily = 1,
}
export enum PayrollStatus {
	Draft = 'draft',
	InProgress = 'in_progress',
	Pending = 'pending',
	Canceled = 'canceled',
	Completed = 'completed',
	Failed = 'failed',
	Calculated = 'calculated',
}
