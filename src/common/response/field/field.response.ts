import { FieldDataType, FieldValidationType } from '../../../common/enums/field-group';
import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class KeyValue {
	@ApiProperty({
		description: 'Key of the key-value pair',
		example: 'male',
	})
	@Expose()
	key: string;

	@ApiProperty({
		description: 'Value of the key-value pair',
		example: 'male',
	})
	@Expose()
	value: string;
}

export class OptionMapperResponse {
	@ApiProperty({
		description: 'Unique identifier for the option mapper',
		example: 12,
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'Name of the option mapper',
		example: 'User Options',
	})
	@Expose()
	name: string;

	@ApiProperty({
		description: 'Key-value mapping for the option',
		type: KeyValue,
		example: { key: 'theme', value: 'dark' }, // Example for keyValue
	})
	@Expose()
	@Type(() => KeyValue)
	keyValue: KeyValue;
}

export class ValidatorResponse {
	@ApiProperty({
		description: 'Unique identifier for the field validator',
		example: 456,
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'Validation type for the field',
		example: 'regex',
	})
	@Expose()
	type: FieldValidationType;

	@ApiProperty({
		description: 'Name of the field validator',
		example: 'Email Validator',
	})
	@Expose()
	name: string;

	@ApiProperty({
		description: 'Internal code for the field validator',
		example: 'EMAIL_VALIDATOR',
	})
	@Expose()
	internalCode: string;

	@ApiProperty({
		description: 'Parameters for the field validator',
		example: { pattern: '^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$' },
	})
	@Expose()
	@Transform(({ value }) => JSON.parse(value))
	parameters: any;
}

export class FieldResponse {
	@ApiProperty({
		description: 'Unique identifier for the field response',
		example: '789',
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'Name of the field response',
		example: 'Email Address',
	})
	@Expose()
	name: string;

	@ApiProperty({
		description: 'code of the field response',
		example: 'Code',
	})
	@Expose()
	code: string;

	@ApiProperty({
		description: 'localName of the field response',
		example: 'localName',
	})
	@Expose()
	localName: string;

	@ApiProperty({
		description: 'internalCode of the field response',
		example: 'internalCode',
	})
	@Expose()
	internalCode: string;

	@ApiProperty({
		description: 'Order of the field',
		example: 1,
	})
	@Expose()
	order: number;

	@ApiProperty({
		description: 'Data type of the field',
		enum: FieldDataType,
		example: FieldDataType.Text,
	})
	@Expose()
	dataType: FieldDataType;

	@ApiProperty({
		description: 'Option mapper for the field',
		type: OptionMapperResponse,
		example: { id: 12, name: 'User Options', keyValue: { key: 'theme', value: 'dark' } },
	})
	@Expose()
	@Type(() => OptionMapperResponse)
	optionMapper: OptionMapperResponse;

	@ApiProperty({
		description: 'Indicates if the field should be validated using the option mapper',
		example: true,
	})
	@Expose()
	validateUsingOptionMapper: boolean;

	@ApiProperty({
		description: 'Indicates if the field is required',
		example: true,
	})
	@Expose()
	isRequired: boolean;

	@ApiProperty({
		description: 'Default value for the field',
		example: 'default_value',
	})
	@Expose()
	defaultValue: string;

	@ApiProperty({
		description: 'Indicates if the field value is editable if filled',
		example: true,
	})
	@Expose()
	isValueEditableIfFilled: boolean;

	@ApiProperty({
		description: 'Validators for the field',
		type: [ValidatorResponse],
		example: [
			{
				id: 122,
				type: 'regex',
				name: 'Email Validator',
				paramaters: { pattern: '^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$' },
			},
		],
	})
	@Expose()
	@Type(() => ValidatorResponse)
	@Transform(({ obj }) => obj.fieldValidators?.map((fv) => fv.validator) || [])
	validator: ValidatorResponse[];
}
