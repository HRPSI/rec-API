/**
 * Builds a response object with the given data and options.
 *
 * @param data - The data to include in the response. Can be of any type.
 * @param classType - The class constructor used for data transformation. Optional.
 * @param isList - A boolean indicating if the data is a list. Defaults to `false`.
 * @returns An object implementing the `IResponseBuilder` interface, allowing further customization of the response.
 */
import { StatusCode } from '../enums';
import { IResponse, IResponseBuilder } from '../response';
import { DataMapper } from '../utils';
import { ClassConstructor } from 'class-transformer';

export function buildResponse(
	data: any = {},
	classType?: ClassConstructor<any>,
	isList: boolean = false,
): IResponseBuilder {
	const response: IResponse = {
		code: StatusCode.OK,
		data: data || null,
		sse: false,
	};

	if (classType && data) {
		response.data = isList ? DataMapper.mapList(classType, data) : DataMapper.mapObject(classType, data);
	}

	return {
		response,
		/**
		 * Sets the response code.
		 * @param {StatusCode} code - The status code to set.
		 * @param {boolean} keepOk - A boolean indicating if the response should keep the OK status code. Defaults to `false`.
		 * @returns {IResponseBuilder} The response builder instance.
		 */
		code(code: StatusCode, keepOk: boolean = false) {
			response.code = code;
			response.keepOk = keepOk;
			return this;
		},

		sse() {
			response.sse = true;
			return this;
		},

		/**
		 * Sets the response message.
		 * @param {string} message - The message to set.
		 * @returns {IResponseBuilder} The response builder instance.
		 */
		message(message: string) {
			response['message'] = message;
			return this;
		},

		/**
		 * Sets the response errors.
		 * @param {any} errors - The errors to set.
		 * @returns {IResponseBuilder} The response builder instance.
		 */
		errors(errors: any) {
			response['errors'] = errors;
			return this;
		},

		/**
		 * Sets the total count.
		 * @param {number} totalCount - The total count to set.
		 * @returns {IResponseBuilder} The response builder instance.
		 */
		totalCount(totalCount: number) {
			response.data = {
				list: response.data,
				totalCount,
			};
			return this;
		},

		cookies(cookies: any) {
			response.cookies = {
				...response.cookies,
				...cookies,
			};
			return this;
		},
	};
}
