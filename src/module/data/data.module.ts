import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './collection/user.model';
import { UserRepository } from './repository/user.repository';
import * as schemas from './collection';
import * as repositories from './repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    MongooseModule.forFeature(
      Object.entries(schemas).map(([name, schema]) => ({
        name: name
          .replace('Schema', '')
          .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
          .replace(/^_/, ''),
        schema,
      })),
    ),
  ],
  providers: [
	...Object.values(repositories),
  ],
  exports: [
	...Object.values(repositories),
  ],
})
export class DataModule {}
