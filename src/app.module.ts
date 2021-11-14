import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { ModelIncModule } from './modelInc/modelInc.module';
import { AuthModule } from './auth/auth.module';


// use process.env
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/LibraryDb',{ connectionName: 'LibraryDb'}),
    ModelIncModule,
    UsersModule, 
    BooksModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
