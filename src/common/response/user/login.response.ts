// src/users/dto/user-device-response.dto.ts
import { Expose, Transform } from 'class-transformer';

export class LoginResponse {
	@Expose()
	@Transform(({ obj }) => obj?.user.id)
	id: string;

	@Expose()
	@Transform(({ obj }) => obj?.user.firstName)
	firstName: string;

	@Expose()
	@Transform(({ obj }) => obj?.user.lastName)
	lastName: string;

	@Expose()
	@Transform(({ obj }) => obj?.user.email)
	email: string;

	// @Expose()
	// accessToken?: string;

	// @Expose()
	// refreshToken?: string;

	@Expose()
	timezone?: string;

	@Expose()
	@Transform(({ obj }) => obj?.user.profilePicture)
	profilePicture?: string;

	@Expose()
	@Transform(({ obj }) => obj?.user.role?.name)
	role?: string;

	@Expose()
	// @Transform(({ obj }) => {
	// 	const permissions = obj?.permissions;
	// 	if (!permissions || !(permissions instanceof Map)) {
	// 		return {};
	// 	}

	// 	// Convert Map<string, Set<string>> to plain object
	// 	const result: Record<string, string[]> = {};
	// 	permissions.forEach((value, key) => {
	// 		result[key] = value instanceof Set ? Array.from(value) : value;
	// 	});
	// 	return result;
	// })
	permissions?: Record<string, Array<string>>;
}
