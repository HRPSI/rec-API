import { TokenPayload } from '../interfaces';

declare global {
	namespace Express {
		interface Request {
			user?: string | TokenPayload;
		}
	}
}

export {};
