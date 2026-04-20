import { ValidatorResponse } from './field/field.response';
import { OptionMapperResponse } from './field/field.response';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SeparationFieldResponse {
	@ApiProperty({
		description: 'The id of the separation field',
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'The name of the separation field',
	})
	@Expose()
	name: string;

	@ApiProperty({
		description: 'The local name of the separation field',
	})
	@Expose()
	localName: string;

	@ApiProperty({
		description: 'The internal code of the separation field',
	})
	@Expose()
	internalCode: string;

	@ApiProperty({
		description: 'The data type of the separation field',
	})
	@Expose()
	dataType: string;

	@ApiProperty({
		description: 'Whether the separation field is required',
	})
	@Expose()
	isRequired: boolean;

	@ApiProperty({
		description: 'The default value of the separation field',
	})
	@Expose()
	defaultValue: string;

	@ApiProperty({
		description: 'Whether the separation field is value editable if filled',
	})
	@Expose()
	isValueEditableIfFilled: boolean;

	@ApiProperty({
		description: 'Whether the separation field is validate using option mapper',
	})
	@Expose()
	validateUsingOptionMapper: boolean;

	@ApiProperty({
		description: 'The order of the separation field',
	})
	@Expose()
	order: number;

	@ApiProperty({
		description: 'The country of the separation field',
	})
	@Expose()
	country: string;

	@ApiProperty({ type: [ValidatorResponse] })
	fieldValidators: ValidatorResponse[];

	@ApiProperty({ type: OptionMapperResponse })
	optionMapper: OptionMapperResponse;
}
