import { Periodicity } from '../../common';
import * as dateFns from 'date-fns';

export class DateHelper {
	public static cyclePeriodDateRange(period: Periodicity) {
		const currentDate = new Date();

		const periodConfig = {
			[Periodicity.Monthly]: {
				startFn: () => dateFns.startOfMonth(currentDate),
				endFn: () => dateFns.endOfMonth(currentDate),
			},
			[Periodicity.BiWeekly]: {
				startFn: () => dateFns.startOfWeek(currentDate),
				endFn: () => dateFns.endOfWeek(currentDate),
			},
			[Periodicity.Weekly]: {
				startFn: () => dateFns.startOfWeek(currentDate),
				endFn: () => dateFns.endOfWeek(currentDate),
			},
			[Periodicity.Daily]: {
				startFn: () => currentDate,
				endFn: () => currentDate,
			},
		};

		const config = periodConfig[period];
		if (!config) {
			throw new Error(`Unsupported periodicity: ${period}`);
		}

		const startDate = dateFns.startOfDay(config.startFn());
		const endDate = dateFns.endOfDay(config.endFn());

		return { startDate, endDate };
	}

	public static endOfDay(date: Date) {
		return dateFns.endOfDay(date);
	}

	public static startOfDay(date: Date) {
		return dateFns.startOfDay(date);
	}

	public static getDaysDiff30DaysBased(startDate: Date, endDate?: Date, plusDays?: number) {
		// If endDate is not provided, use the end of the start date's month
		endDate = endDate || dateFns.endOfMonth(startDate);

		// Convert dates to 30-day months
		startDate = this.convert31MonthsTo30Days(startDate);
		endDate = this.convert31MonthsTo30Days(endDate);

		// Calculate the difference treating all months as 30 days
		let totalDays = 0;

		// If dates are in the same month
		if (dateFns.isSameMonth(startDate, endDate)) {
			totalDays = dateFns.getDate(endDate) - dateFns.getDate(startDate);
		} else {
			// Calculate days from start date to end of its month (treating as 30 days)
			const startMonthDays = 30 - dateFns.getDate(startDate) + 1;

			// Calculate days from beginning of end date's month to end date (treating as 30 days)
			const endMonthDays = dateFns.getDate(endDate);

			// Calculate months in between (each treated as 30 days)
			const monthsBetween = this.getMonthsBetween(startDate, endDate);
			const monthsBetweenDays = monthsBetween * 30;

			totalDays = startMonthDays + monthsBetweenDays + endMonthDays - 1; // -1 because we're counting both start and end dates
		}

		// Add February adjustment if needed
		if (this.checkFebruaryMonth(startDate)) {
			plusDays = plusDays ? plusDays + 2 : 2;
		}

		return totalDays + (plusDays || 0);
	}

	private static getMonthsBetween(startDate: Date, endDate: Date): number {
		const startYear = dateFns.getYear(startDate);
		const startMonth = dateFns.getMonth(startDate);
		const endYear = dateFns.getYear(endDate);
		const endMonth = dateFns.getMonth(endDate);

		// Calculate months difference
		const monthsDiff = (endYear - startYear) * 12 + (endMonth - startMonth);

		// If end date is in the same month or next month, no months in between
		if (monthsDiff <= 1) {
			return 0;
		}

		// Return months in between (excluding start and end months)
		return monthsDiff - 1;
	}

	/**
	 * Calculate days difference with month normalization to 30 days
	 * Always treats months as having 30 days, regardless of actual calendar days
	 * @param startDate Start date
	 * @param endDate End date
	 * @returns Number of days with months normalized to 30 days
	 */
	public static getDaysDiffWithMonthNormalization(startDate: Date, endDate: Date): number {
		// Get normalized day numbers (treating months as 30 days)
		const startDay = this.getNormalizedDayOfMonth(startDate);
		const endDay = this.getNormalizedDayOfMonth(endDate);

		let totalDays = 0;

		// If dates are in the same month
		if (dateFns.isSameMonth(startDate, endDate)) {
			// Calculate inclusive days: endDay - startDay + 1
			totalDays = endDay - startDay + 1;
		} else {
			// Calculate days from start date to end of its month (treating as 30 days)
			const startMonthDays = 30 - startDay + 1;

			// Calculate days from beginning of end date's month to end date (treating as 30 days)
			const endMonthDays = endDay;

			// Calculate months in between (each treated as 30 days)
			const monthsBetween = this.getMonthsBetween(startDate, endDate);
			const monthsBetweenDays = monthsBetween * 30;

			totalDays = startMonthDays + monthsBetweenDays + endMonthDays;
		}

		return totalDays;
	}

	/**
	 * Get normalized day of month for 30-day month calculation
	 * - If date is the last day of month (28, 29, 30, or 31), treat it as day 30
	 * - If day is 31, treat it as day 30
	 * - Otherwise, return the actual day number
	 * @param date Date to normalize
	 * @returns Normalized day number (1-30)
	 */
	private static getNormalizedDayOfMonth(date: Date): number {
		const dayOfMonth = dateFns.getDate(date);
		const lastDayOfMonth = dateFns.getDaysInMonth(date);

		// If it's the last day of the month (could be 28, 29, 30, or 31), normalize to day 30
		if (dayOfMonth === lastDayOfMonth) {
			return 30;
		}

		// If day is 31, convert to 30
		if (dayOfMonth === 31) {
			return 30;
		}

		return dayOfMonth;
	}

	public static getMonthNumber(date: Date) {
		return dateFns.getMonth(date) + 1;
	}

	public static getMonthName(month: number) {
		const date = new Date(2000, month - 1, 1); // Create date for given month (month-1 since months are 0-based)
		return dateFns.format(date, 'MMMM'); // Format to full month name
	}

	public static getYear(date: Date) {
		return dateFns.getYear(date);
	}

	public static getDate(date: Date) {
		return dateFns.getDate(date);
	}

	public static subtractDays(date: Date, days: number) {
		return dateFns.subDays(date, days);
	}

	public static addDays(date: Date, days: number) {
		return dateFns.addDays(date, days);
	}

	public static subtractMonths(date: Date, months: number) {
		return dateFns.subMonths(date, months);
	}

	public static addMonths(date: Date, months: number) {
		return dateFns.addMonths(date, months);
	}

	public static subtractYears(date: Date, years: number) {
		return dateFns.subYears(date, years);
	}

	public static endOfMonth(date: Date) {
		return dateFns.endOfMonth(date);
	}

	public static addYears(date: Date, years: number) {
		return dateFns.addYears(date, years);
	}

	public static getCurrentMonthDateRange() {
		const currentDate = new Date();
		const startDate = dateFns.startOfMonth(currentDate);
		const endDate = dateFns.endOfMonth(currentDate);
		return { startDate, endDate };
	}

	public static getMaxDate(dates: Date[]) {
		dates = dates.filter((date) => date !== null);
		if (dates.length === 0) {
			return null;
		}
		return dateFns.max(dates);
	}

	public static getMinDate(dates: Date[]) {
		dates = dates.filter((date) => date !== null);
		if (dates.length === 0) {
			return null;
		}
		return dateFns.min(dates);
	}

	public static isDateInRange(date: Date, startDate: Date, endDate: Date) {
		return dateFns.isWithinInterval(date, { start: startDate, end: endDate });
	}

	public static isBefore(date: Date, dateToCompare: Date) {
		return dateFns.isBefore(date, dateToCompare);
	}

	public static isDayBefore(date: Date, dateToCompare: Date) {
		return dateFns.isBefore(dateFns.startOfDay(date), dateFns.startOfDay(dateToCompare));
	}

	public static isAfter(date: Date, dateToCompare: Date) {
		return dateFns.isAfter(date, dateToCompare);
	}

	public static formatDate(date: Date, format: string) {
		return dateFns.format(date, format);
	}

	public static isSameDay(date: Date, dateToCompare: Date) {
		return dateFns.isSameDay(date, dateToCompare);
	}

	public static convert31MonthsTo30Days(date: Date) {
		// actual date day
		const dateDay = dateFns.getDate(date);

		if (dateDay == 31) {
			return dateFns.setDate(date, 30);
		}

		return date;
	}

	public static checkFebruaryMonth(date: Date) {
		const dateDay = dateFns.getDate(date);
		const month = dateFns.getMonth(date);
		if (month == 1 && dateDay == 28) {
			return true;
		}
		return false;
	}

	public static getDateFromMonthAndYear(month: number, year: number, isEndOfMonth: boolean = false) {
		if (isEndOfMonth) {
			return dateFns.setDate(dateFns.setMonth(new Date(), month), dateFns.getDaysInMonth(new Date(year, month - 1)));
		}
		return dateFns.setDate(dateFns.setMonth(new Date(), month), 1);
	}

	public static calculatePeriodRange(periodicity: Periodicity, anchorDate: Date): { startDate: Date; endDate: Date } {
		const normalizedAnchor = this.startOfDay(anchorDate);
		switch (periodicity) {
			case Periodicity.Monthly: {
				const startDate = this.startOfDay(normalizedAnchor);
				const endDate = this.endOfDay(dateFns.endOfMonth(startDate));
				return { startDate, endDate };
			}
			case Periodicity.BiWeekly: {
				const startOfWeek = this.startOfDay(dateFns.startOfWeek(normalizedAnchor));
				const endOfSecondWeek = this.endOfDay(dateFns.endOfWeek(dateFns.addWeeks(startOfWeek, 1)));
				return { startDate: startOfWeek, endDate: endOfSecondWeek };
			}
			case Periodicity.Weekly: {
				const startOfWeek = this.startOfDay(dateFns.startOfWeek(normalizedAnchor));
				const endOfWeek = this.endOfDay(dateFns.endOfWeek(normalizedAnchor));
				return { startDate: startOfWeek, endDate: endOfWeek };
			}
			case Periodicity.Daily:
			default: {
				const startDate = this.startOfDay(normalizedAnchor);
				const endDate = this.endOfDay(startDate);
				return { startDate, endDate };
			}
		}
	}

	public static calculateNextPeriodRange(
		periodicity: Periodicity,
		currentPeriodStart: Date,
	): { startDate: Date; endDate: Date } {
		const normalizedStart = this.startOfDay(currentPeriodStart);
		switch (periodicity) {
			case Periodicity.Monthly: {
				const nextAnchor = dateFns.addMonths(normalizedStart, 1);
				return this.calculatePeriodRange(periodicity, nextAnchor);
			}
			case Periodicity.BiWeekly: {
				const nextAnchor = dateFns.addWeeks(normalizedStart, 2);
				return this.calculatePeriodRange(periodicity, nextAnchor);
			}
			case Periodicity.Weekly: {
				const nextAnchor = dateFns.addWeeks(normalizedStart, 1);
				return this.calculatePeriodRange(periodicity, nextAnchor);
			}
			case Periodicity.Daily:
			default: {
				const nextAnchor = dateFns.addDays(normalizedStart, 1);
				return this.calculatePeriodRange(periodicity, nextAnchor);
			}
		}
	}

	public static getNextPeriodDate(
		startDate: Date,
		endDate: Date,
		periodicity: Periodicity,
	): { startDate: Date; endDate: Date } {
		const periodConfig = {
			[Periodicity.Monthly]: {
				startFn: (date: Date) => dateFns.addMonths(dateFns.startOfMonth(date), 1),
				endFn: (date: Date) => dateFns.endOfMonth(dateFns.addMonths(date, 1)),
			},
			[Periodicity.BiWeekly]: {
				startFn: (date: Date) => dateFns.addWeeks(dateFns.startOfWeek(date), 2),
				endFn: (date: Date) => dateFns.endOfWeek(dateFns.addWeeks(date, 2)),
			},
			[Periodicity.Weekly]: {
				startFn: (date: Date) => dateFns.addWeeks(dateFns.startOfWeek(date), 1),
				endFn: (date: Date) => dateFns.endOfWeek(dateFns.addWeeks(date, 1)),
			},
			[Periodicity.Daily]: {
				startFn: (date: Date) => dateFns.addDays(date, 1),
				endFn: (date: Date) => dateFns.addDays(date, 1),
			},
		};

		const config = periodConfig[periodicity];
		if (!config) {
			throw new Error(`Unsupported periodicity: ${periodicity}`);
		}

		const nextStartDate = dateFns.startOfDay(config.startFn(endDate));
		const nextEndDate = dateFns.endOfDay(config.endFn(endDate));

		return { startDate: nextStartDate, endDate: nextEndDate };
	}

	public static formatWeekDateRange(startDate: Date, endDate: Date): string {
		return `${dateFns.format(startDate, 'MMM dd, yyyy')} - ${dateFns.format(endDate, 'MMM dd, yyyy')}`;
	}

	public static startOfWeek(date: Date): Date {
		return dateFns.startOfWeek(date);
	}

	public static endOfWeek(date: Date): Date {
		return dateFns.endOfWeek(date);
	}

	public static addWeeks(date: Date, weeks: number): Date {
		return dateFns.addWeeks(date, weeks);
	}
}
