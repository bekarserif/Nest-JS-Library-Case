import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express'

@Controller('books')
export class BooksController {

    // Get Books
    @Get()
    findAll(@Req() request: Request): string {
        return 'This action returns all books'
    }

    // Get Book/[id]
    @Get(':id')
    findOne(@Param() params): string {
      console.log(params.id);
      return `This action returns a #${params.id} book`;
    }

    // Create Book
    @Post()
    @HttpCode(201)
    create(): string {
        return 'This action adds a book';
    }

   

    
}
