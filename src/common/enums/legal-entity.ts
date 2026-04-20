export enum FieldGroupType {
	Employee = 'Employee',
	System = 'System',
}

export enum LegalEntityFieldGroupSortField {
	Id = 'id',
	Order = 'order',
	Name = 'name',
}

export enum LegalEntityFieldGroupHistorySortField {
	CreatedAt = 'createdAt',
	FieldGroupId = 'fieldGroupId',
	Action = 'action',
	FieldName = 'fieldName',
	UserId = 'userId',
	UserName = 'userName',
	UserEmail = 'userEmail',
}

export enum LegalEntityFieldHistorySortField {
	CreatedAt = 'createdAt',
	FieldId = 'fieldId',
	Action = 'action',
	FieldName = 'fieldName',
	UserId = 'userId',
	UserName = 'userName',
	UserEmail = 'userEmail',
}

export enum LegalEntityFieldSortField {
	Id = 'id',
	Name = 'name',
	ReferenceCode = 'referenceCode',
}
