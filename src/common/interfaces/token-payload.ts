export interface TokenPayload {
	id: number; // User ID
	firstName: string; // User's name
	lastName: string; // User's name
	email: string; // User's email
	role?: string; // User's role name (legacy)
	roleId?: number;
	roleName?: string;
	roleVersion?: number;
	permissions?: Record<string, Array<string>>; //Array<{ resource: string; action: string }>;
	deviceId: string; // Device identifier
	legalEntityId?: number; // Legal entity ID
	assignedCountries?: number[]; // List of country IDs
	assignedLegalEntities?: number[]; // List of legal entity IDs
	type?: string; // Token type (e.g., 'AccessToken', 'RefreshToken')
	accessToken?: string; // Access token
	exp?: number; // Token expiration timestamp
	iat?: number; // Issued at timestamp
}
