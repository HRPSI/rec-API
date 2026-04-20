import { Expose } from 'class-transformer';

export class EmployeeListTemplateResponse {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	status: string;

	@Expose()
	employeeReference: string;

	@Expose()
	fieldGroups: Record<string, Record<string, any>>;
}
