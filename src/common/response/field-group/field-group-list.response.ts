// src/users/dto/user-device-response.dto.ts
import { Expose } from 'class-transformer';
import { FieldGroupResponse } from './field-group.response';

export class FieldGroupListResponse {
	@Expose()
	fieldGroups: FieldGroupResponse[];
}
