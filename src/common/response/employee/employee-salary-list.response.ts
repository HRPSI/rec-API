// src/users/dto/employee-salary-list-response.dto.ts
import { Expose, Transform, Type } from 'class-transformer';

class SalaryDto {
	@Expose()
	name: string;

	@Expose()
	periodicAmount: string;

	@Expose()
	isGrossUp: boolean;

	@Expose()
	startDate: string;

	@Expose()
	endDate: string | null;

	@Expose()
	currency: string;

	@Expose()
	occurrence: string;

	@Expose()
	type: string;

	@Expose()
	payUnit: string;

	@Expose()
	@Transform(({ obj }) => obj?.payElement?.account || null)
	payAccount: string | null;
}

export class EmployeeSalaryListResponse {
	@Expose()
	@Transform(({ obj }) => obj?.employee?.id)
	id: string;

	@Expose()
	@Transform(({ obj }) => obj?.employee?.name)
	name: string;

	@Expose()
	@Transform(({ obj }) => obj?.employee?.employeeReference)
	employeeReference: string;

	@Expose()
	@Type(() => SalaryDto)
	@Transform(({ obj }) => ({
		id: obj.id,
		name: obj.name,
		periodicAmount: obj.periodicAmount,
		isGrossUp: obj.isGrossUp,
		startDate: obj.startDate,
		endDate: obj.endDate,
		currency: obj.currency,
		occurrence: obj.occurrence,
		type: obj.type,
		payUnit: obj.payUnit,
		payAccount: obj.payElement?.account || null,
		payId: obj.payElement?.id,
		isActive: obj.isActive,
		balance: obj.balance || null,
		goalAmount: obj.goalAmount || null,
	}))
	salary: SalaryDto;
}
