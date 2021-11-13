import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [],
})
export class BooksModule {}
