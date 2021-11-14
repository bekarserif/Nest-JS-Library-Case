import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { ModelIncModule } from './modelInc/modelInc.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.Mongo_Ip}/${process.env.Mongo_Db}`,{ connectionName: 'LibraryDb'}),
    ModelIncModule,
    UsersModule, 
    BooksModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
