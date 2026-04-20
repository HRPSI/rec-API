import { Expose, Type } from 'class-transformer';
import { FieldResponse } from '../field/field.response';
import { FieldGroupType } from '../../../common/enums';

export class FieldGroupResponse {
	@Expose()
	id: number;

	@Expose()
	fieldGroupType: FieldGroupType;

	@Expose()
	name: string;

	@Expose()
	code: string;

	@Expose()
	localName: string;

	@Expose()
	internalCode: string;

	@Expose()
	order: number;

	@Expose()
	isVisible: boolean;
	@Expose()
	ignoreRequiredIfEmpty: boolean;

	@Expose()
	isSubgroup: boolean;

	@Expose()
	isSalaryFieldGroup: boolean;

	@Expose()
	isSystemFieldGroup: boolean;

	@Expose()
	countryIsoCode: string;

	@Expose()
	@Type(() => FieldGroupResponse)
	subFieldGroups: FieldGroupResponse[];

	@Expose()
	@Type(() => FieldResponse)
	fields: FieldResponse[];
}
