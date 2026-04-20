import { CellPattern, CellAlignment, CellVerticalAlignment, CellFontFamily } from '../enums/report';
import { BorderStyle } from 'exceljs';

export interface CellFont {
	bold: boolean;
	name: CellFontFamily;
	size: number;
	color: { argb: string };
}

export interface CellAlignmentStyle {
	vertical: CellVerticalAlignment;
	horizontal: CellAlignment;
}

export interface CellFill {
	type: 'pattern';
	pattern: CellPattern;
	fgColor: { argb: string };
}

export interface CellBorder {
	style: BorderStyle;
	color: { argb: string };
}

export interface CellStyle {
	font: CellFont;
	alignment?: CellAlignmentStyle;
	fill?: CellFill;
	border?: CellBorder;
}

export interface ReportStyle {
	headerStyle: CellStyle;
	dataStyle: CellStyle;
}
