import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import * as crypto from 'crypto';
import { Env } from '@app/common';

const ALGO = 'aes-256-gcm';
const ISSUER = 'Recruitment';

@Injectable()
export class TwoFactorService {
	generateSecret(email: string): { secret: string; otpauthUrl: string } {
		const secret = speakeasy.generateSecret({ name: `${ISSUER} (${email})`, issuer: ISSUER, length: 20 });
		return { secret: secret.base32, otpauthUrl: secret.otpauth_url! };
	}

	async generateQrCode(otpauthUrl: string): Promise<string> {
		return qrcode.toDataURL(otpauthUrl);
	}

	verifyToken(secret: string, token: string): boolean {
		return speakeasy.totp.verify({ secret, encoding: 'base32', token, window: 1 });
	}

	encryptSecret(secret: string): string {
		const key = this.getKey();
		const iv = crypto.randomBytes(12);
		const cipher = crypto.createCipheriv(ALGO, key, iv);
		const enc = Buffer.concat([cipher.update(secret, 'utf8'), cipher.final()]);
		const tag = cipher.getAuthTag();
		return `${iv.toString('base64')}:${tag.toString('base64')}:${enc.toString('base64')}`;
	}

	decryptSecret(payload: string): string {
		const key = this.getKey();
		const [ivB64, tagB64, dataB64] = payload.split(':');
		const iv = Buffer.from(ivB64, 'base64');
		const tag = Buffer.from(tagB64, 'base64');
		const data = Buffer.from(dataB64, 'base64');
		const decipher = crypto.createDecipheriv(ALGO, key, iv);
		decipher.setAuthTag(tag);
		const dec = Buffer.concat([decipher.update(data), decipher.final()]);
		return dec.toString('utf8');
	}

	private getKey(): Buffer {
		const seed = Env.JWT_ACCESS_INFO_SECRET || Env.JWT_ACCESS_TOKEN_SECRET || 'default-2fa-key-change-me';
		return crypto.createHash('sha256').update(seed).digest();
	}
}
