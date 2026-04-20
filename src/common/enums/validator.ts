export enum ValidatorType {
	REQUIRED = 'required',
	MIN_LENGTH = 'minLength',
	MAX_LENGTH = 'maxLength',
	MIN = 'min',
	MAX = 'max',
	PATTERN = 'pattern',
	EMAIL = 'email',
	DATE = 'date',
	CUSTOM = 'custom',
	STRING_LENGTH = 'string_length',
	DATE_RANGE = 'date_range',
	REGEX = 'regex',
}

export enum ValidatorStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

export enum ValidatorSortField {
	Id = 'id',
	Name = 'name',
}
