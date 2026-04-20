import { FieldGroupType } from '../../../common/enums';
import { Expose } from 'class-transformer';

export class FieldGroupRowResponse {
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
	countryIsoCode: string;
}
