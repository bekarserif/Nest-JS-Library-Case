import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-sequence')(MongooseModule),{inc_field: 'id'});
          return schema;
        },
      },
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
