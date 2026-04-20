import { Logger } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export class DataMapper {
	private static readonly logger = new Logger('DataMapper');

	/**
	 * Map a plain object to a class instance
	 * @param classType The class to map to
	 * @param sourceObject The plain object to map from
	 */
	static mapObject<T>(classType: ClassConstructor<T>, sourceObject: object): T {
		return this.transform(classType, sourceObject, false);
	}

	/**
	 * Map a plain object to a class instance without decorators
	 * @param classType The class to map to
	 * @param sourceObject The plain object to map from
	 */
	static mapObjectIgnoreDecorators<T>(classType: ClassConstructor<T>, sourceObject: object): T {
		return this.transform(classType, sourceObject, true);
	}

	/**
	 * Map an array of plain objects to class instances
	 * @param classType The class to map to
	 * @param sourceObjectList The list of plain objects to map from
	 */
	static mapList<T>(classType: ClassConstructor<T>, sourceObjectList: object[]): T[] {
		return sourceObjectList.map((sourceObject) => this.mapObject(classType, sourceObject));
	}

	/**
	 * Helper method to perform the actual mapping logic
	 * @param classType The class to map to
	 * @param sourceObject The plain object to map from
	 * @param ignoreDecorators Whether to ignore class-transformer decorators
	 */
	private static transform<T>(classType: ClassConstructor<T>, sourceObject: object, ignoreDecorators: boolean): T {
		const mappedInstance = plainToInstance(classType, sourceObject, {
			excludeExtraneousValues: true,
			ignoreDecorators,
		});

		this.logger.debug({
			sourceObject,
			mappedInstance,
		});

		return mappedInstance;
	}
}
