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
    return await this.bookModel.find().select({ _id: 0, __v: 0, isBorrowed: 0 }).exec();
  }

  // Get Books/[Id]
  async findOne(query): Promise<Book> {
    const book = await this.bookModel.findOne(query).select({ _id: 0, __v: 0 });
    if (book == null) {
      const host = 'https://www.googleapis.com/books/v1';
      let q = '';
      Object.keys(query).map((key) => {
        switch (key) {
          case 'name':
            q = q.length > 0 ? q + `+intitle:${query.name}` : q + `intitle:${query.name}`
            break;
          case 'author':
            q = q.length > 0 ? q + `+inauthor:${query.author}` : q + `intitle:${query.author}`
            break;
          case 'publisher':
            q = q.length > 0 ? q + `+intitle:${query.publisher}` : q + `intitle:${query.publisher}`
            break;
          case 'subject':
            q = q.length > 0 ? q + `+intitle:${query.subject}` : q + `intitle:${query.subject}`
            break;
          default:
            break;
        }
      })
      // use process.env
      const googleQuery = encodeURI(`/volumes?q=${q}&printType=books&maxResults=1&key=AIzaSyA7Vk_FXuQpTjCNLDJxTzMqpVGRT8uPPNA`)
      const res = await this.httpService.get(host + googleQuery).toPromise();
      console.log(res);
      if (res.data.totalItems > 0) {
        const bookValues = res.data.items[0];
        const createdBook = await this.create({
          name: bookValues.volumeInfo.title,
          googleId: bookValues.id,
          selfLink: bookValues.selfLink,
          authors: bookValues.volumeInfo.authors,
          language: bookValues.volumeInfo.language,
          publishedDate: bookValues.volumeInfo.publishedDate
        });
        
      return createdBook;
      }
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

  async findbyQueryAndUpdate(query, updatedObject) {
    return await this.bookModel.updateOne(query, { $set: updatedObject });
  }


}
