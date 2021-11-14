import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express'
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { SearchBookDto } from './dto/search-book.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Controller('books')
export class BooksController {
    constructor(
        private readonly bookService: BooksService

    ) { }
    // Get Books

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Query() query:SearchBookDto, @Req() request: Request, @Res() res: Response) {
        try {
            if (Object.keys(query).length > 0) {
                const book = await this.bookService.findOne(query);   
                res.status(HttpStatus.OK).send(book);
            }
            else{
                const books = await this.bookService.findAll();
                res.status(HttpStatus.OK).send(books);
            }
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }


    // Create Book
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
        try {
            await this.bookService.create(createBookDto);
            res.status(HttpStatus.CREATED).send();
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }
}
