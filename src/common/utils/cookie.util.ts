import type { CookieOptions, Response } from 'express';
import { Env } from '../constants';

export const ACCESS_COOKIE = 'access_token';
export const REFRESH_COOKIE = 'refresh_token';

const isProd = Env.NODE_ENV === 'production';

function baseOptions(maxAgeSeconds: number, path: string): CookieOptions {
	return {
		httpOnly: true,
		secure: isProd,
		sameSite: 'strict',
		path,
		maxAge: maxAgeSeconds * 1000,
	};
}

export function setAuthCookies(
	res: Response,
	accessToken: string,
	refreshToken: string,
	accessTtlSeconds: number,
	refreshTtlSeconds: number,
): void {
	res.cookie(ACCESS_COOKIE, accessToken, baseOptions(accessTtlSeconds, '/'));
	// Refresh cookie scoped to /auth so it's only sent to refresh/logout endpoints.
	res.cookie(REFRESH_COOKIE, refreshToken, baseOptions(refreshTtlSeconds, '/auth'));
}

export function clearAuthCookies(res: Response): void {
	res.clearCookie(ACCESS_COOKIE, { path: '/', httpOnly: true, secure: isProd, sameSite: 'strict' });
	res.clearCookie(REFRESH_COOKIE, { path: '/auth', httpOnly: true, secure: isProd, sameSite: 'strict' });
}
