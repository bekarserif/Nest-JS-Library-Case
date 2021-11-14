import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { Request } from 'express'
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';
import { Response } from 'express';
@Controller('books')
export class BooksController {
    constructor(
        private readonly bookService: BooksService
        
        ) {}
    // Get Books
    @Get()
    findAll(@Req() request: Request): Promise<Book[]> {
        return this.bookService.findAll();
    }

    // Get Book/[id]
    @Get(':id')
    findOne(@Param() params):  Promise<Book> {
      return this.bookService.findOne({id:Number(params.id)})
    }

    // Create Book
    @Post()
    async create(@Body() createBookDto: CreateBookDto, @Res() res:Response){
        try {
            await this.bookService.create(createBookDto);
            res.status(HttpStatus.CREATED).send();
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send() 
        }
        
    }

   

    
}
