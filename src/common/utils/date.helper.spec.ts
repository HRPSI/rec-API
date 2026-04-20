/**
 * Unit tests for DateHelper utility class
 * Tests all date calculation methods used in payroll processing
 */

import { Periodicity } from '../../common';
import { DateHelper } from './date.helper';

describe('DateHelper', () => {
	// ============================================================================
	// getDaysDiff30DaysBased Tests
	// ============================================================================
	describe('getDaysDiff30DaysBased', () => {
		it('should calculate days difference within same month', () => {
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-01-15');
			const result = DateHelper.getDaysDiff30DaysBased(startDate, endDate);
			expect(result).toBe(14); // Jan 1 to Jan 15 = 14 days
		});

		it('should calculate days difference for full month (30 days)', () => {
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-01-30');
			const result = DateHelper.getDaysDiff30DaysBased(startDate, endDate);
			expect(result).toBe(29); // Jan 1 to Jan 30 = 29 days difference
		});

		it('should treat 31st as 30th', () => {
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-01-31');
			// 31st should be converted to 30th
			const result = DateHelper.getDaysDiff30DaysBased(startDate, endDate);
			expect(result).toBe(29); // Same as Jan 30
		});

		it('should handle February (28 days) with adjustment', () => {
			const startDate = new Date('2024-02-28');
			const endDate = new Date('2024-03-01');
			const result = DateHelper.getDaysDiff30DaysBased(startDate, endDate);
			// February 28 gets +2 adjustment
			expect(result).toBeGreaterThanOrEqual(1);
		});

		it('should calculate across multiple months', () => {
			const startDate = new Date('2024-01-15');
			const endDate = new Date('2024-03-15');
			const result = DateHelper.getDaysDiff30DaysBased(startDate, endDate);
			// Jan 15-30 = 16 days, Feb = 30 days, Mar 1-15 = 15 days - 1 = 60
			expect(result).toBe(60);
		});

		it('should use end of month if endDate not provided', () => {
			const startDate = new Date('2024-01-15');
			const result = DateHelper.getDaysDiff30DaysBased(startDate);
			// Should calculate from Jan 15 to Jan 31 (treated as 30)
			expect(result).toBe(15); // 30 - 15 = 15 days
		});

		it('should add plusDays when provided', () => {
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-01-15');
			const result = DateHelper.getDaysDiff30DaysBased(startDate, endDate, 5);
			expect(result).toBe(19); // 14 + 5 = 19
		});
	});

	// ============================================================================
	// getDaysDiffWithMonthNormalization Tests
	// ============================================================================
	describe('getDaysDiffWithMonthNormalization', () => {
		it('should calculate days within same month (inclusive)', () => {
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-01-15');
			const result = DateHelper.getDaysDiffWithMonthNormalization(startDate, endDate);
			expect(result).toBe(15); // Days 1-15 inclusive
		});

		it('should normalize full month to 30 days', () => {
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-01-31');
			const result = DateHelper.getDaysDiffWithMonthNormalization(startDate, endDate);
			expect(result).toBe(30); // Full month normalized to 30
		});

		it('should normalize February end to day 30', () => {
			const startDate = new Date('2024-02-01');
			const endDate = new Date('2024-02-29'); // Leap year
			const result = DateHelper.getDaysDiffWithMonthNormalization(startDate, endDate);
			expect(result).toBe(30); // Feb end normalized to day 30
		});

		it('should handle cross-month calculation', () => {
			const startDate = new Date('2024-01-15');
			const endDate = new Date('2024-02-15');
			const result = DateHelper.getDaysDiffWithMonthNormalization(startDate, endDate);
			// Jan 15-30 = 16 days, Feb 1-15 = 15 days
			expect(result).toBe(31); // 16 + 15 = 31
		});

		it('should handle multi-month spans', () => {
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-03-31');
			const result = DateHelper.getDaysDiffWithMonthNormalization(startDate, endDate);
			// 3 months * 30 days = 90 days
			expect(result).toBe(90);
		});

		it('should handle single day (start equals end)', () => {
			const startDate = new Date('2024-01-15');
			const endDate = new Date('2024-01-15');
			const result = DateHelper.getDaysDiffWithMonthNormalization(startDate, endDate);
			expect(result).toBe(1); // Single day is inclusive
		});
	});

	// ============================================================================
	// calculatePeriodRange Tests
	// ============================================================================
	describe('calculatePeriodRange', () => {
		describe('Monthly periodicity', () => {
			it('should calculate monthly range from start of month', () => {
				const anchorDate = new Date('2024-01-01');
				const result = DateHelper.calculatePeriodRange(Periodicity.Monthly, anchorDate);
				expect(result.startDate.getDate()).toBe(1);
				expect(result.startDate.getMonth()).toBe(0); // January
				expect(result.endDate.getDate()).toBe(31);
				expect(result.endDate.getMonth()).toBe(0); // January
			});

			it('should calculate monthly range from mid-month', () => {
				const anchorDate = new Date('2024-01-15');
				const result = DateHelper.calculatePeriodRange(Periodicity.Monthly, anchorDate);
				// Should still be same month
				expect(result.startDate.getDate()).toBe(15);
				expect(result.endDate.getDate()).toBe(31);
			});
		});

		describe('BiWeekly periodicity', () => {
			it('should calculate bi-weekly range (14 days)', () => {
				const anchorDate = new Date('2024-01-08'); // Monday
				const result = DateHelper.calculatePeriodRange(Periodicity.BiWeekly, anchorDate);
				const diffDays = (result.endDate.getTime() - result.startDate.getTime()) / (1000 * 60 * 60 * 24);
				expect(diffDays).toBeGreaterThanOrEqual(13); // At least 13 days (14 days span)
				expect(diffDays).toBeLessThanOrEqual(14);
			});
		});

		describe('Weekly periodicity', () => {
			it('should calculate weekly range (7 days)', () => {
				const anchorDate = new Date('2024-01-10'); // Wednesday
				const result = DateHelper.calculatePeriodRange(Periodicity.Weekly, anchorDate);
				const diffDays = (result.endDate.getTime() - result.startDate.getTime()) / (1000 * 60 * 60 * 24);
				expect(diffDays).toBeGreaterThanOrEqual(6); // 7 days span
				expect(diffDays).toBeLessThanOrEqual(7);
			});
		});

		describe('Daily periodicity', () => {
			it('should calculate daily range (single day)', () => {
				const anchorDate = new Date('2024-01-15');
				const result = DateHelper.calculatePeriodRange(Periodicity.Daily, anchorDate);
				expect(result.startDate.getDate()).toBe(15);
				expect(result.endDate.getDate()).toBe(15);
			});
		});
	});

	// ============================================================================
	// calculateNextPeriodRange Tests
	// ============================================================================
	describe('calculateNextPeriodRange', () => {
		it('should calculate next monthly period', () => {
			const currentStart = new Date('2024-01-01');
			const result = DateHelper.calculateNextPeriodRange(Periodicity.Monthly, currentStart);
			expect(result.startDate.getMonth()).toBe(1); // February
			expect(result.startDate.getDate()).toBe(1);
		});

		it('should calculate next bi-weekly period', () => {
			const currentStart = new Date('2024-01-01');
			const result = DateHelper.calculateNextPeriodRange(Periodicity.BiWeekly, currentStart);
			// Next bi-weekly starts 2 weeks from start of current week
			expect(result.startDate).toBeInstanceOf(Date);
			expect(result.endDate).toBeInstanceOf(Date);
			expect(result.startDate.getTime()).toBeGreaterThan(currentStart.getTime());
		});

		it('should calculate next weekly period', () => {
			const currentStart = new Date('2024-01-01');
			const result = DateHelper.calculateNextPeriodRange(Periodicity.Weekly, currentStart);
			// Next weekly starts 1 week from start of current week
			expect(result.startDate).toBeInstanceOf(Date);
			expect(result.endDate).toBeInstanceOf(Date);
			expect(result.startDate.getTime()).toBeGreaterThan(currentStart.getTime());
		});

		it('should calculate next daily period', () => {
			const currentStart = new Date('2024-01-01');
			const result = DateHelper.calculateNextPeriodRange(Periodicity.Daily, currentStart);
			expect(result.startDate.getDate()).toBe(2);
		});
	});

	// ============================================================================
	// getNextPeriodDate Tests
	// ============================================================================
	describe('getNextPeriodDate', () => {
		it('should get next monthly period date', () => {
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-01-31');
			const result = DateHelper.getNextPeriodDate(startDate, endDate, Periodicity.Monthly);
			expect(result.startDate.getMonth()).toBe(1); // February
			expect(result.endDate.getMonth()).toBe(1);
		});

		it('should get next bi-weekly period date', () => {
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-01-14');
			const result = DateHelper.getNextPeriodDate(startDate, endDate, Periodicity.BiWeekly);
			const daysDiff = (result.startDate.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24);
			expect(daysDiff).toBeGreaterThanOrEqual(1);
		});

		it('should throw error for unsupported periodicity', () => {
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-01-31');
			expect(() => DateHelper.getNextPeriodDate(startDate, endDate, 'unsupported' as Periodicity)).toThrow(
				'Unsupported periodicity',
			);
		});
	});

	// ============================================================================
	// isDateInRange Tests
	// ============================================================================
	describe('isDateInRange', () => {
		const startDate = new Date('2024-01-01');
		const endDate = new Date('2024-01-31');

		it('should return true for date within range', () => {
			const date = new Date('2024-01-15');
			expect(DateHelper.isDateInRange(date, startDate, endDate)).toBe(true);
		});

		it('should return true for date on start boundary', () => {
			expect(DateHelper.isDateInRange(startDate, startDate, endDate)).toBe(true);
		});

		it('should return true for date on end boundary', () => {
			expect(DateHelper.isDateInRange(endDate, startDate, endDate)).toBe(true);
		});

		it('should return false for date before range', () => {
			const date = new Date('2023-12-31');
			expect(DateHelper.isDateInRange(date, startDate, endDate)).toBe(false);
		});

		it('should return false for date after range', () => {
			const date = new Date('2024-02-01');
			expect(DateHelper.isDateInRange(date, startDate, endDate)).toBe(false);
		});
	});

	// ============================================================================
	// isSameDay Tests
	// ============================================================================
	describe('isSameDay', () => {
		it('should return true for same day', () => {
			const date1 = new Date('2024-01-15T10:30:00');
			const date2 = new Date('2024-01-15T22:45:00');
			expect(DateHelper.isSameDay(date1, date2)).toBe(true);
		});

		it('should return false for different days', () => {
			const date1 = new Date('2024-01-15');
			const date2 = new Date('2024-01-16');
			expect(DateHelper.isSameDay(date1, date2)).toBe(false);
		});

		it('should return false for same day different month', () => {
			const date1 = new Date('2024-01-15');
			const date2 = new Date('2024-02-15');
			expect(DateHelper.isSameDay(date1, date2)).toBe(false);
		});
	});

	// ============================================================================
	// isBefore / isAfter / isDayBefore Tests
	// ============================================================================
	describe('isBefore', () => {
		it('should return true when first date is before second', () => {
			const date1 = new Date('2024-01-15');
			const date2 = new Date('2024-01-16');
			expect(DateHelper.isBefore(date1, date2)).toBe(true);
		});

		it('should return false when dates are equal', () => {
			const date = new Date('2024-01-15');
			expect(DateHelper.isBefore(date, date)).toBe(false);
		});

		it('should return false when first date is after second', () => {
			const date1 = new Date('2024-01-16');
			const date2 = new Date('2024-01-15');
			expect(DateHelper.isBefore(date1, date2)).toBe(false);
		});
	});

	describe('isDayBefore', () => {
		it('should compare at day level ignoring time', () => {
			const date1 = new Date('2024-01-15T23:59:59');
			const date2 = new Date('2024-01-16T00:00:01');
			expect(DateHelper.isDayBefore(date1, date2)).toBe(true);
		});

		it('should return false for same day regardless of time', () => {
			const date1 = new Date('2024-01-15T00:00:00');
			const date2 = new Date('2024-01-15T23:59:59');
			expect(DateHelper.isDayBefore(date1, date2)).toBe(false);
		});
	});

	describe('isAfter', () => {
		it('should return true when first date is after second', () => {
			const date1 = new Date('2024-01-16');
			const date2 = new Date('2024-01-15');
			expect(DateHelper.isAfter(date1, date2)).toBe(true);
		});

		it('should return false when dates are equal', () => {
			const date = new Date('2024-01-15');
			expect(DateHelper.isAfter(date, date)).toBe(false);
		});
	});

	// ============================================================================
	// getMaxDate / getMinDate Tests
	// ============================================================================
	// describe('getMaxDate', () => {
	// 	it('should return the latest date', () => {
	// 		const dates = [new Date('2024-01-15'), new Date('2024-03-01'), new Date('2024-02-10')];
	// 		const result = DateHelper.getMaxDate(dates);
	// 		expect(result.getMonth()).toBe(2); // March
	// 	});

	// 	it('should filter out null values', () => {
	// 		const dates = [new Date('2024-01-15'), null, new Date('2024-03-01')];
	// 		const result = DateHelper.getMaxDate(dates);
	// 		expect(result.getMonth()).toBe(2); // March
	// 	});

	// 	it('should return null for empty array', () => {
	// 		expect(DateHelper.getMaxDate([])).toBeNull();
	// 	});

	// 	it('should return null for array of nulls', () => {
	// 		expect(DateHelper.getMaxDate([null, null])).toBeNull();
	// 	});
	// });

	// describe('getMinDate', () => {
	// 	it('should return the earliest date', () => {
	// 		const dates = [new Date('2024-03-01'), new Date('2024-01-15'), new Date('2024-02-10')];
	// 		const result = DateHelper.getMinDate(dates);
	// 		expect(result.getMonth()).toBe(0); // January
	// 	});

	// 	it('should filter out null values', () => {
	// 		const dates = [null, new Date('2024-03-01'), new Date('2024-01-15')];
	// 		const result = DateHelper.getMinDate(dates);
	// 		expect(result.getMonth()).toBe(0); // January
	// 	});

	// 	it('should return null for empty array', () => {
	// 		expect(DateHelper.getMinDate([])).toBeNull();
	// 	});
	// });

	// ============================================================================
	// Date Arithmetic Tests
	// ============================================================================
	describe('addDays', () => {
		it('should add days correctly', () => {
			const date = new Date('2024-01-15');
			const result = DateHelper.addDays(date, 10);
			expect(result.getDate()).toBe(25);
		});

		it('should handle month overflow', () => {
			const date = new Date('2024-01-25');
			const result = DateHelper.addDays(date, 10);
			expect(result.getMonth()).toBe(1); // February
			expect(result.getDate()).toBe(4);
		});
	});

	describe('subtractDays', () => {
		it('should subtract days correctly', () => {
			const date = new Date('2024-01-15');
			const result = DateHelper.subtractDays(date, 10);
			expect(result.getDate()).toBe(5);
		});

		it('should handle month underflow', () => {
			const date = new Date('2024-01-05');
			const result = DateHelper.subtractDays(date, 10);
			expect(result.getMonth()).toBe(11); // December
			expect(result.getFullYear()).toBe(2023);
		});
	});

	describe('addMonths', () => {
		it('should add months correctly', () => {
			const date = new Date('2024-01-15');
			const result = DateHelper.addMonths(date, 2);
			expect(result.getMonth()).toBe(2); // March
		});

		it('should handle year overflow', () => {
			const date = new Date('2024-11-15');
			const result = DateHelper.addMonths(date, 3);
			expect(result.getFullYear()).toBe(2025);
			expect(result.getMonth()).toBe(1); // February
		});
	});

	describe('subtractMonths', () => {
		it('should subtract months correctly', () => {
			const date = new Date('2024-03-15');
			const result = DateHelper.subtractMonths(date, 2);
			expect(result.getMonth()).toBe(0); // January
		});

		it('should handle year underflow', () => {
			const date = new Date('2024-02-15');
			const result = DateHelper.subtractMonths(date, 3);
			expect(result.getFullYear()).toBe(2023);
			expect(result.getMonth()).toBe(10); // November
		});
	});

	describe('addYears / subtractYears', () => {
		it('should add years correctly', () => {
			const date = new Date('2024-01-15');
			const result = DateHelper.addYears(date, 2);
			expect(result.getFullYear()).toBe(2026);
		});

		it('should subtract years correctly', () => {
			const date = new Date('2024-01-15');
			const result = DateHelper.subtractYears(date, 2);
			expect(result.getFullYear()).toBe(2022);
		});
	});

	// ============================================================================
	// convert31MonthsTo30Days Tests
	// ============================================================================
	describe('convert31MonthsTo30Days', () => {
		it('should convert 31st to 30th', () => {
			const date = new Date('2024-01-31');
			const result = DateHelper.convert31MonthsTo30Days(date);
			expect(result.getDate()).toBe(30);
		});

		it('should not change dates before 31st', () => {
			const date = new Date('2024-01-15');
			const result = DateHelper.convert31MonthsTo30Days(date);
			expect(result.getDate()).toBe(15);
		});

		it('should not change 30th', () => {
			const date = new Date('2024-01-30');
			const result = DateHelper.convert31MonthsTo30Days(date);
			expect(result.getDate()).toBe(30);
		});
	});

	// ============================================================================
	// checkFebruaryMonth Tests
	// ============================================================================
	describe('checkFebruaryMonth', () => {
		it('should return true for February 28', () => {
			const date = new Date('2024-02-28');
			expect(DateHelper.checkFebruaryMonth(date)).toBe(true);
		});

		it('should return false for February 29 (leap year)', () => {
			const date = new Date('2024-02-29');
			expect(DateHelper.checkFebruaryMonth(date)).toBe(false);
		});

		it('should return false for other months', () => {
			const date = new Date('2024-01-28');
			expect(DateHelper.checkFebruaryMonth(date)).toBe(false);
		});
	});

	// ============================================================================
	// getMonthNumber / getMonthName Tests
	// ============================================================================
	describe('getMonthNumber', () => {
		it('should return 1-based month number', () => {
			expect(DateHelper.getMonthNumber(new Date('2024-01-15'))).toBe(1);
			expect(DateHelper.getMonthNumber(new Date('2024-12-15'))).toBe(12);
		});
	});

	describe('getMonthName', () => {
		it('should return full month name', () => {
			expect(DateHelper.getMonthName(1)).toBe('January');
			expect(DateHelper.getMonthName(12)).toBe('December');
		});
	});

	// ============================================================================
	// formatDate Tests
	// ============================================================================
	describe('formatDate', () => {
		it('should format date with yyyy-MM-dd', () => {
			const date = new Date('2024-01-15');
			const result = DateHelper.formatDate(date, 'yyyy-MM-dd');
			expect(result).toBe('2024-01-15');
		});

		it('should format date with MMMM yyyy', () => {
			const date = new Date('2024-01-15');
			const result = DateHelper.formatDate(date, 'MMMM yyyy');
			expect(result).toBe('January 2024');
		});
	});

	// ============================================================================
	// formatWeekDateRange Tests
	// ============================================================================
	describe('formatWeekDateRange', () => {
		it('should format date range correctly', () => {
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-01-07');
			const result = DateHelper.formatWeekDateRange(startDate, endDate);
			expect(result).toContain('Jan 01, 2024');
			expect(result).toContain('Jan 07, 2024');
			expect(result).toContain(' - ');
		});
	});

	// ============================================================================
	// cyclePeriodDateRange Tests
	// ============================================================================
	describe('cyclePeriodDateRange', () => {
		it('should return monthly range', () => {
			const result = DateHelper.cyclePeriodDateRange(Periodicity.Monthly);
			expect(result.startDate).toBeDefined();
			expect(result.endDate).toBeDefined();
			expect(result.startDate.getDate()).toBe(1);
		});

		it('should throw error for unsupported periodicity', () => {
			expect(() => DateHelper.cyclePeriodDateRange('invalid' as Periodicity)).toThrow('Unsupported periodicity');
		});
	});

	// ============================================================================
	// startOfDay / endOfDay Tests
	// ============================================================================
	describe('startOfDay / endOfDay', () => {
		it('startOfDay should set time to 00:00:00', () => {
			const date = new Date('2024-01-15T15:30:45');
			const result = DateHelper.startOfDay(date);
			expect(result.getHours()).toBe(0);
			expect(result.getMinutes()).toBe(0);
			expect(result.getSeconds()).toBe(0);
		});

		it('endOfDay should set time to 23:59:59', () => {
			const date = new Date('2024-01-15T10:00:00');
			const result = DateHelper.endOfDay(date);
			expect(result.getHours()).toBe(23);
			expect(result.getMinutes()).toBe(59);
			expect(result.getSeconds()).toBe(59);
		});
	});

	// ============================================================================
	// Week-related Tests
	// ============================================================================
	describe('startOfWeek / endOfWeek / addWeeks', () => {
		it('startOfWeek should return start of week', () => {
			const date = new Date('2024-01-10'); // Wednesday
			const result = DateHelper.startOfWeek(date);
			expect(result.getDay()).toBe(0); // Sunday (default week start)
		});

		it('endOfWeek should return end of week', () => {
			const date = new Date('2024-01-10'); // Wednesday
			const result = DateHelper.endOfWeek(date);
			expect(result.getDay()).toBe(6); // Saturday
		});

		it('addWeeks should add weeks correctly', () => {
			const date = new Date('2024-01-01');
			const result = DateHelper.addWeeks(date, 2);
			const daysDiff = (result.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
			expect(daysDiff).toBe(14);
		});
	});
});
