import { Env } from '@app/common';
export function validateEnv() {
	let missingEnv = 'Missing environment variables';
	let isMissing = false;
	Object.keys(Env).forEach((env) => {
		if (process.env[env] === undefined && env !== 'DOT_ENV') {
			missingEnv += `\n${env} `;
			isMissing = true;
		}
	});
	return {
		isValid: !isMissing,
		message: missingEnv,
	};
}
