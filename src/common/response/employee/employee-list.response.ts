// src/users/dto/user-device-response.dto.ts
import { Expose, Transform } from 'class-transformer';

export class EmployeeListResponse {
	@Expose()
	id: string;

	@Expose()
	name: string;

	@Expose()
	position: string;

	@Expose()
	hiringDate: string;

	@Expose()
	terminationDate: string;

	@Expose()
	@Transform(({ obj }) => obj?.employeeReference)
	referenceCode: string;

	@Expose()
	status?: string;
}
