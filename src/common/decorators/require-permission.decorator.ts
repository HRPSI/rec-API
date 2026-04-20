import { SetMetadata } from '@nestjs/common';
import { PermissionAction, PermissionResource } from '../enums';

export const PERMISSION_METADATA = 'requiredPermission';

export const RequirePermission = (resource: PermissionResource, action: PermissionAction) =>
	SetMetadata(PERMISSION_METADATA, { resource, action });
