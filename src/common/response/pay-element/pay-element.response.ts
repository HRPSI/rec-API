import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PayElementType } from '../../../common';

export class PayElementResponse {
	@ApiProperty({
		description: 'Unique identifier for the pay element',
		example: 1,
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'Name of the pay element',
		example: 'Basic Salary',
	})
	@Expose()
	name: string;

	@ApiProperty({
		description: 'Local name of the pay element',
		example: 'الراتب الأساسي',
	})
	@Expose()
	localName: string;

	@ApiProperty({
		description: 'Code of the pay element',
		example: 'BS',
	})
	@Expose()
	code: string;

	@ApiProperty({
		description: 'Type of the pay element',
		example: 'EARNING',
	})
	@Expose()
	type: PayElementType;

	@Expose()
	@Transform(({ obj }) => (obj.isSystemPayElement ? obj.type : obj.clonedPayElement?.type))
	systemType: PayElementType;

	@ApiProperty({
		description: 'Account type of the pay element',
		example: 'Income',
	})
	@Expose()
	accountType: string;

	@ApiProperty({
		description: 'Balance type of the pay element',
		example: 'Credit',
	})
	@Expose()
	balanceType: string;

	@ApiProperty({
		description: 'Calculation type of the pay element',
		example: 'Fixed',
	})
	@Expose()
	calculationType: string;

	@Expose()
	@Transform(({ obj }) => (obj.isSystemPayElement ? obj.calculationType : obj.clonedPayElement?.calculationType))
	systemCalculationType: string;

	@ApiProperty({
		description: 'Account number for the pay element',
		example: '1001',
	})
	@Expose()
	account: string;

	@ApiProperty({
		description: 'Counter account number',
		example: '2001',
	})
	@Expose()
	counterAccount: string;

	@ApiProperty({
		description: 'Enforce setting flag',
		example: true,
	})
	@Expose()
	enforceSetting: boolean;

	@ApiProperty({
		description: 'Formula for calculation',
		example: 'Basic * 0.1',
	})
	@Expose()
	formula: string;

	@ApiProperty({
		description: 'GL code',
		example: 'GL001',
	})
	@Expose()
	glCode: string;

	@ApiProperty({
		description: 'Output Pay Element Account',
		example: '62100',
	})
	@Expose()
	outputPayElementAccount: string;

	@ApiProperty({
		description: 'Input Pay Element Account',
		example: '62100',
	})
	@Expose()
	inputPayElementAccount: string;

	@ApiProperty({
		description: 'Active status',
		example: true,
	})
	@Expose()
	isActive: boolean;

	@ApiProperty({
		description: 'Gross up flag',
		example: false,
	})
	@Expose()
	grossUp: boolean;

	@Expose()
	@Transform(({ obj }) => (obj.isSystemPayElement ? obj.grossUp : obj.clonedPayElement?.grossUp))
	systemGrossUp: boolean;

	@ApiProperty({
		description: 'When accrual reset',
		example: 'Monthly',
	})
	@Expose()
	whenAccrualReset: string;

	@ApiProperty({
		description: 'Group code',
		example: 'GRP001',
	})
	@Expose()
	groupCode: string;

	@ApiProperty({
		description: 'Prorating method',
		example: 'Daily',
	})
	@Expose()
	proratingMethod: string;

	@ApiProperty({
		description: 'Taxable status',
		example: true,
	})
	@Expose()
	taxable: boolean;

	@ApiProperty({
		description: 'Pay unit',
		example: 'Monthly',
	})
	@Expose()
	payUnit: string;

	@ApiProperty({
		description: 'Tax code',
		example: 'TAX001',
	})
	@Expose()
	taxCode: string;

	@ApiProperty({
		description: 'Ignore if zero flag',
		example: false,
	})
	@Expose()
	ignoreIfZero: boolean;

	@ApiProperty({
		description: 'Occurrence',
		example: 'Monthly',
	})
	@Expose()
	occurrence: string;

	@ApiProperty({
		description: 'System name',
		example: 'Monthly',
	})
	@Expose()
	@Transform(({ obj }) => (obj.isSystemPayElement ? obj.name : obj.clonedPayElement?.name))
	systemName: string;

	@ApiProperty({
		description: 'System account',
		example: 'Monthly',
	})
	@Expose()
	@Transform(({ obj }) => (obj.isSystemPayElement ? obj.account : obj.clonedPayElement?.account))
	systemAccount: string;

	@ApiProperty({
		description: 'System counter account',
		example: '1001',
	})
	@Expose()
	@Transform(({ obj }) => (obj.isSystemPayElement ? obj.counterAccount : obj.clonedPayElement?.counterAccount))
	systemCounterAccount: string;

	@ApiProperty({
		description: 'System pay unit',
		example: 'DAILY',
	})
	@Expose()
	@Transform(({ obj }) => (obj.isSystemPayElement ? obj.payUnit : obj.clonedPayElement?.payUnit))
	systemPayUnit: string;

	@ApiProperty({
		description: 'System occurrence',
		example: 'MONTHLY',
	})
	@Expose()
	@Transform(({ obj }) => (obj.isSystemPayElement ? obj.occurrence : obj.clonedPayElement?.occurrence))
	systemOccurrence: string;
}
