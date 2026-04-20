import { SetMetadata } from '@nestjs/common';

export const ROLE_METADATA = 'requiredRoles';

export const RequireRole = (roles: string | string[]) =>
	SetMetadata(ROLE_METADATA, Array.isArray(roles) ? roles : [roles]);
