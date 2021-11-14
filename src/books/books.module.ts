import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { Book, BookSchema } from './schemas/book.schema';
import { ModelIncModule } from 'src/modelInc/modelInc.module';
import { BooksService } from './books.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }],'LibraryDb'),
    ModelIncModule,
    HttpModule
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService]
})
export class BooksModule {}
