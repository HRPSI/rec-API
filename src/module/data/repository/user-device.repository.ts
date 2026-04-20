import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDevice } from '../collection/user-device.model';

@Injectable()
export class UserDeviceRepository {
	constructor(@InjectModel('user_device') private readonly devices: Model<UserDevice>) {}

	getUserDeviceByDeviceId(deviceId: string): Promise<UserDevice | null> {
		return this.devices.findOne({ deviceId }).exec();
	}

	create(data: Partial<UserDevice>): UserDevice {
		return new this.devices(data);
	}
}
