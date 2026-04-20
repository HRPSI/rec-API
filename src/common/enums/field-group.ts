export enum FieldDataType {
	Text = 'string',
	Number = 'number',
	Date = 'date',
	Attachment = 'attachment',
}

export enum FieldValidationType {
	REGEX = 'regex',
	STRING_LENGTH = 'string_length',
	DATE_RANGE = 'date_range',
}

export enum FieldGroupSortField {
	Id = 'id',
	Order = 'order',
	Name = 'name',
}

export enum FieldGroupHistorySortField {
	CreatedAt = 'createdAt',
	FieldGroupId = 'fieldGroupId',
	Action = 'action',
	FieldName = 'fieldName',
	UserId = 'userId',
	UserName = 'userName',
	UserEmail = 'userEmail',
}
