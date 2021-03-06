import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ModelIncService } from 'src/modelInc/modelInc.service';
import { BooksService } from 'src/books/books.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private modelIncService: ModelIncService,
    private booksService: BooksService
  ) { }

  // Get Users
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // Get User/[Id]
  async findOne(query): Promise<User>{
    return await this.userModel.findOne(query).select({ _id: 0, __v: 0 });
  }

  // Create User
  async create(createUserDto: CreateUserDto): Promise<User> {
    const id = await this.modelIncService.getNextId(User.name)
    const createdCat = await this.userModel.create({
      id,
      ...createUserDto
    });
    return createdCat;
  }

  // Borrow Book
  async borrowBook(id,bookId):Promise<boolean>{
    const user = await this.userModel.findOne({id});
    const book = await this.booksService.findOne({id:bookId});
    if (!book.isBorrowed) {
      this.booksService.findbyQueryAndUpdate({id:bookId},{
        isBorrowed:true})
      await this.userModel.updateOne({id},{
        $push: { 'books.present': {name: book.name} }
      });
      
      return true;
    }
    return false;
  }

  // Return Book
  async returnBook(id, bookId, userScore):Promise<boolean>{
    const user = await this.userModel.findOne({id});
    const book = await this.booksService.findOne({id:bookId});
    await this.booksService.findbyQueryAndUpdate({id:bookId},{isBorrowed:false});
    const indexOfPresentBook = user.books.present.findIndex((x)=>(x.name == book.name));
    if (indexOfPresentBook < -1) return false;
    user.books.present.splice(indexOfPresentBook, 1);
    
    user.markModified('books');
    await user.save();
    await this.userModel.updateOne({id},{
      $push: { 'books.past': {
        name: book.name,
        userScore
      } }
    });
    return true;
  }
}
