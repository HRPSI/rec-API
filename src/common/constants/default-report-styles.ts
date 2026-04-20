import { ReportStyle } from '../interfaces/report-style.interface';
import { CellPattern, CellAlignment, CellVerticalAlignment, CellFontFamily } from '../enums/report';

export const DEFAULT_REPORT_STYLE: ReportStyle = {
	headerStyle: {
		font: {
			bold: true,
			name: CellFontFamily.ARIAL,
			size: 12,
			color: { argb: 'FFFFFFFF' }, // White text
		},
		alignment: {
			vertical: CellVerticalAlignment.MIDDLE,
			horizontal: CellAlignment.CENTER,
		},
		fill: {
			type: 'pattern',
			pattern: CellPattern.SOLID,
			fgColor: { argb: '4472C4' }, // Professional blue color
		},
		border: {
			style: 'thin',
			color: { argb: '000000' }, // Black border
		},
	},
	dataStyle: {
		font: {
			bold: false,
			name: CellFontFamily.ARIAL,
			size: 11,
			color: { argb: '000000' }, // Black text
		},
		alignment: {
			vertical: CellVerticalAlignment.MIDDLE,
			horizontal: CellAlignment.LEFT,
		},
		border: {
			style: 'thin',
			color: { argb: 'D9D9D9' }, // Light gray border
		},
	},
};
