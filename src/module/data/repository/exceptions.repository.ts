import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryFilter, Model } from 'mongoose';
import { Exception } from '../collection/exceptions.model';
import { ListingBaseDto } from '../../../common/dto/list-base.dto';

@Injectable()
export class ExceptionsRepository {
	private logger = new Logger('ExceptionsRepository');

	constructor(@InjectModel('exception') private exceptions: Model<Exception>) {}

	async createException(exception: Omit<Exception, keyof Document>): Promise<Exception> {
		const newException = new this.exceptions(exception);
		return await newException.save();
	}

	async getException(exceptionId: string): Promise<Exception | null> {
		return await this.exceptions.findById(exceptionId);
	}

	async getExceptions(listingBaseDto: ListingBaseDto): Promise<Exception[]> {
		const { legalEntityId, page, limit } = listingBaseDto;
		const skip = (page - 1) * limit;
		const query: QueryFilter<Exception> = {};
		if (legalEntityId) {
			query.legalEntityId = legalEntityId;
		}
		return await this.exceptions.find(query).skip(skip).limit(limit).sort({ timestamp: -1 });
	}
}
