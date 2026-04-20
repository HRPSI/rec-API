import { ApiProperty } from '@nestjs/swagger';
import { SeparationFieldResponse } from './separation-field';
import { Expose, Transform, Type } from 'class-transformer';
import { DataMapper } from '../utils';
export class SeparationFieldGroupResponse {
	@ApiProperty({
		description: 'The id of the separation field group',
		example: 1,
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'The name of the separation field group',
		example: 'Separation Field Group',
	})
	@Expose()
	name: string;

	@ApiProperty({
		description: 'The local name of the separation field group',
		example: 'Separation Field Group',
	})
	@Expose()
	localName: string;

	@ApiProperty({
		description: 'The internal code of the separation field group',
		example: 'Separation Field Group',
	})
	@Expose()
	internalCode: string;

	@ApiProperty({
		description: 'The order of the separation field group',
		example: 1,
	})
	@Expose()
	order: number;

	@ApiProperty({
		description: 'Whether the separation field group is visible',
		example: true,
	})
	@Expose()
	isVisible: boolean;

	@ApiProperty({
		description: 'Whether the separation field group is system field group',
		example: true,
	})
	@Expose()
	isSystemFieldGroup: boolean;

	@ApiProperty({
		description: 'Whether the separation field group is ignore required if empty',
		example: true,
	})
	@Expose()
	ignoreRequiredIfEmpty: boolean;

	@ApiProperty({
		description: 'Whether the separation field group is subgroup',
		example: true,
	})
	@Expose()
	isSubgroup: boolean;

	@ApiProperty({ type: [SeparationFieldGroupResponse] })
	@Type(() => SeparationFieldGroupResponse)
	@Expose({ name: 'subFieldGroups' })
	@Transform(
		({ obj }) => {
			if (!obj.subSeparationFieldGroups) {
				return [];
			}
			return DataMapper.mapList(SeparationFieldGroupResponse, obj.subSeparationFieldGroups);
		},
		{
			toClassOnly: true,
		},
	)
	subFieldGroups: SeparationFieldGroupResponse[];

	@ApiProperty({ type: SeparationFieldGroupResponse })
	@Type(() => SeparationFieldGroupResponse)
	@Expose({ name: 'parentFieldGroup' })
	@Transform(({ obj }) => obj.parentSeparationFieldGroup, { toClassOnly: true })
	parentFieldGroup: SeparationFieldGroupResponse;

	@ApiProperty({ type: [SeparationFieldResponse] })
	@Type(() => SeparationFieldResponse)
	@Transform(({ obj }) => obj.separationFields, { toClassOnly: true })
	@Expose({ name: 'fields' })
	fields: SeparationFieldResponse[];
}

export class SeparationFieldGroupRowResponse {
	@ApiProperty({
		description: 'The id of the separation field group',
		example: 1,
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'The name of the separation field group',
		example: 'Separation Field Group',
	})
	@Expose()
	name: string;

	@ApiProperty({
		description: 'Whether the separation field group is visible',
		example: true,
	})
	@Expose()
	isVisible: boolean;

	@ApiProperty({
		description: 'The local name of the separation field group',
		example: 'Separation Field Group',
	})
	@Expose()
	localName: string;

	@ApiProperty({
		description: 'The internal code of the separation field group',
		example: 'Separation Field Group',
	})
	@Expose()
	internalCode: string;

	@ApiProperty({
		description: 'The country iso code of the separation field group',
		example: 'Separation Field Group',
	})
	@Expose()
	countryIsoCode: string;

	@ApiProperty({
		description: 'The order of the separation field group',
		example: 1,
	})
	@Expose()
	order: number;

	@ApiProperty({
		description: 'Whether the separation field group is ignore required if empty',
		example: true,
	})
	@Expose()
	ignoreRequiredIfEmpty: boolean;
}
