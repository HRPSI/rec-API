import { LegalEntityFieldResponse } from './legal-entity-field';
import { DataMapper } from '../utils';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';

export class LegalEntityFieldGroupResponse {
	@ApiProperty({
		description: 'The id of the legal entity field group',
		example: 1,
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'The name of the legal entity field group',
		example: 'Legal Entity Field Group',
	})
	@Expose()
	name: string;

	@ApiProperty({
		description: 'The local name of the legal entity field group',
		example: 'Legal Entity Field Group',
	})
	@Expose()
	localName: string;

	@ApiProperty({
		description: 'The internal code of the legal entity field group',
		example: 'Legal Entity Field Group',
	})
	@Expose()
	internalCode: string;

	@ApiProperty({
		description: 'The order of the legal entity field group',
		example: 1,
	})
	@Expose()
	order: number;

	@ApiProperty({
		description: 'Whether the legal entity field group is visible',
		example: true,
	})
	@Expose()
	isVisible: boolean;

	@ApiProperty({
		description: 'Whether the legal entity field group is system field group',
		example: true,
	})
	@Expose()
	isSystemFieldGroup: boolean;

	@ApiProperty({
		description: 'Whether the legal entity field group is ignore required if empty',
		example: true,
	})
	@Expose()
	ignoreRequiredIfEmpty: boolean;

	@ApiProperty({
		description: 'Whether the legal entity field group is subgroup',
		example: true,
	})
	@Expose()
	isSubgroup: boolean;

	@ApiProperty({ type: [LegalEntityFieldGroupResponse] })
	@Type(() => LegalEntityFieldGroupResponse)
	@Expose({ name: 'subFieldGroups' })
	@Transform(
		({ obj }) => {
			if (obj.isSubgroup) {
				return undefined;
			}
			if (!obj.subLegalEntityFieldGroups) {
				return [];
			}
			return DataMapper.mapList(LegalEntityFieldGroupResponse, obj.subLegalEntityFieldGroups);
		},
		{
			toClassOnly: true,
		},
	)
	subFieldGroups: LegalEntityFieldGroupResponse[];

	@ApiProperty({ type: LegalEntityFieldGroupResponse })
	@Type(() => LegalEntityFieldGroupResponse)
	@Expose({ name: 'parentFieldGroup' })
	@Transform(({ obj }) => obj.parentLegalEntityFieldGroup, { toClassOnly: true })
	parentFieldGroup: LegalEntityFieldGroupResponse;

	@ApiProperty({ type: [LegalEntityFieldResponse] })
	@Type(() => LegalEntityFieldResponse)
	@Expose({ name: 'fields' })
	@Transform(({ obj }) => obj.legalEntityFields || [], { toClassOnly: true })
	fields: LegalEntityFieldResponse[] = [];
}

export class LegalEntityFieldGroupRowResponse {
	@ApiProperty({
		description: 'The id of the legal entity field group',
		example: 1,
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'The name of the legal entity field group',
		example: 'Legal Entity Field Group',
	})
	@Expose()
	name: string;

	@ApiProperty({
		description: 'Whether the legal entity field group is visible',
		example: true,
	})
	@Expose()
	isVisible: boolean;

	@ApiProperty({
		description: 'The local name of the legal entity field group',
		example: 'Legal Entity Field Group',
	})
	@Expose()
	localName: string;

	@ApiProperty({
		description: 'The internal code of the legal entity field group',
		example: 'Legal Entity Field Group',
	})
	@Expose()
	internalCode: string;

	@ApiProperty({
		description: 'The country iso code of the legal entity field group',
		example: 'Legal Entity Field Group',
	})
	@Expose()
	countryIsoCode: string;

	@ApiProperty({
		description: 'The order of the legal entity field group',
		example: 1,
	})
	@Expose()
	order: number;

	@ApiProperty({
		description: 'Whether the legal entity field group is ignore required if empty',
		example: true,
	})
	@Expose()
	ignoreRequiredIfEmpty: boolean;
}
