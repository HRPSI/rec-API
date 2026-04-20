import { Module } from '@nestjs/common';
import { SharedController } from './shared.controller';
import { SharedService } from './shared.service';
import { MongoService } from './services/mongo.service';

@Module({
  controllers: [SharedController],
  providers: [SharedService, MongoService],
})
export class SharedModule {}
