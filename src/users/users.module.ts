import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { ModelIncModule } from 'src/modelInc/modelInc.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }],'LibraryDb'),
    ModelIncModule,
    BooksModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
