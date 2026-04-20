import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LookupResponse {
	@ApiProperty({
		description: 'The id of the lookup',
	})
	@Expose()
	id: number | string;

	@ApiProperty({
		description: 'The value of the lookup',
	})
	@Expose()
	value: string;
}
