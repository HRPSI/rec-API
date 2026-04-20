import { Env } from '../../../common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
	constructor(private readonly jwtService: JwtService) {}

	// Generate Access Token
	generateAccessToken(payload: any): string {
		return this.jwtService.sign(payload, {
			secret: Env.JWT_ACCESS_TOKEN_SECRET,
			expiresIn: Number(Env.JWT_ACCESS_TOKEN_EXPIRATION),
		});
	}

	// Generate Refresh Token
	generateRefreshToken(payload: any): string {
		return this.jwtService.sign(payload, {
			secret: Env.JWT_REFRESH_TOKEN_SECRET,
			expiresIn: Number(Env.JWT_REFRESH_TOKEN_EXPIRATION), // e.g., '7d'
		});
	}

	generateInfoToken(payload: any): string {
		return this.jwtService.sign(payload, {
			secret: Env.JWT_ACCESS_INFO_SECRET,
			expiresIn: Number(Env.JWT_REFRESH_TOKEN_EXPIRATION), // e.g., '7d'
		});
	}

	// Validate Access Token
	validateAccessToken(token: string): any {
		try {
			return this.jwtService.verify(token, {
				secret: Env.JWT_ACCESS_TOKEN_SECRET,
			});
		} catch {
			return null; // If invalid, return null
		}
	}

	// Validate Refresh Token
	validateRefreshToken(token: string): any {
		try {
			return this.jwtService.verify(token, {
				secret: Env.JWT_REFRESH_TOKEN_SECRET,
			});
		} catch {
			return null; // If invalid, return null
		}
	}

	// Decode token without verifying (for extracting info without validation)
	decodeToken(token: string): any {
		return this.jwtService.decode(token);
	}
}
