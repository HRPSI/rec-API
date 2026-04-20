import { StringToBoolean } from '../../common/decorators';
import { ExportType, SortDirection } from '../../common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsNumber, IsPositive, IsString, IsEnum, IsBoolean } from 'class-validator';

export class ListingBaseDto {
	@IsOptional()
	@ApiProperty({
		description: 'id',
		example: 1,
	})
	@Type(() => Number)
	id?: number;

	@IsOptional()
	@ApiProperty({
		description: 'paage',
		example: 0,
	})
	@Transform(({ value }) => {
		// Only transform if value is a string (raw input), skip if already a number (already transformed)
		if (typeof value === 'number') {
			return value;
		}
		return (+value || 1) - 1;
	})
	page: number = 0;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@Type(() => Number)
	@ApiProperty({
		description: 'limit',
		example: 10,
	})
	limit: number = 10;

	@IsOptional()
	@IsString()
	@IsEnum(SortDirection)
	sortDirection: SortDirection = SortDirection.DESC;

	@IsOptional()
	@IsString()
	@Type(() => String)
	@ApiProperty({
		description: 'search',
		example: 'asdasd',
	})
	search: string = '';

	@IsOptional()
	@IsEnum(ExportType)
	@ApiProperty({
		description: 'export',
		example: ExportType.JSON,
	})
	export: ExportType;

	@IsOptional()
	@ApiProperty({
		description: 'legalEntityId',
		example: 1,
	})
	@Type(() => Number)
	@IsOptional()
	legalEntityId: number;

	@IsOptional()
	@ApiProperty({
		description: 'countryId',
		example: 1,
	})
	@Type(() => Number)
	@IsOptional()
	countryId: number;

	@IsOptional()
	@StringToBoolean()
	@ApiProperty({
		description: 'isSystemSettings',
		example: true,
	})
	isSystemSettings: boolean = false;

	// this is for unread notifications only
	@IsOptional()
	@StringToBoolean()
	@ApiProperty({
		description: 'isUnread',
		example: true,
	})
	unreadOnly: boolean = false;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@Type(() => Number)
	@ApiProperty({
		description: 'payGroupId',
		example: 1,
	})
	payGroupId: number;

	@IsOptional()
	@Type(() => Date)
	@ApiProperty({
		description: 'periodCycleEndDate',
		example: '2024-12-31',
	})
	periodCycleEndDate?: Date;

	@IsOptional()
	@IsBoolean()
	isAdvancePayroll?: boolean;

	@IsOptional()
	@Type(() => Date)
	payrollStartDate?: Date;

	@IsOptional()
	@Type(() => Date)
	payrollEndDate?: Date;
}
