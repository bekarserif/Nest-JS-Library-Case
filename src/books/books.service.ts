import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { ModelIncService } from 'src/modelInc/modelInc.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    private modelIncService: ModelIncService,
    private httpService: HttpService
  ) { }

  // Get Books
  async findAll(): Promise<Book[]> {
    return await this.bookModel.find().select({_id: 0, __v: 0, isBorrowed: 0}).exec();
  }

  // Get Books/[Id]
  async findOne(query): Promise<Book>{
    const book = await this.bookModel.findOne(query).select({_id: 0, __v: 0});
    if(!book){
        const res = await this.httpService.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query.title||query.name}
        +inauthor:${query.author}+inpublisher:${query.publisher}+subject:${query.subject}
        &key=yourAPIKey`);  
        console.log(res);
        // book = await new this.bookModel({id}).save();
    } 
    return book;
  }

  // Create Book
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const id = await this.modelIncService.getNextId(Book.name)
    const createdBook = await this.bookModel.create({
      id,
      ...createBookDto
    });
    return createdBook;
  }

  async findbyQueryAndUpdate(query,updatedObject){
    return await this.bookModel.updateOne(query,{$set:updatedObject});
  }


}
