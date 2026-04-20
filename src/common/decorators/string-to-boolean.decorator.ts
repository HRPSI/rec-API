import { Transform } from 'class-transformer';

export function StringToBoolean() {
	return Transform(({ value }) => {
		if (value === null || value === undefined) {
			return value;
		}

		if (typeof value === 'boolean') {
			return value;
		}

		if (typeof value === 'string') {
			const lowerValue = value.toLowerCase().trim();
			if (lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes') {
				return true;
			}
			if (lowerValue === 'false' || lowerValue === '0' || lowerValue === 'no') {
				return false;
			}
		}

		return value;
	});
}
