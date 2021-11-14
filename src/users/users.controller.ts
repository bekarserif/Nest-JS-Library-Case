import { Body, Controller, Get,  HttpStatus, Param, Post,  Res } from '@nestjs/common';
import { Response } from 'express'
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
    
    // Get Users
    @Get()
    findAll(): Promise<User[]>{
      return this.userService.findAll();
    }

    // Get User/[id]
    @Get(':id')
    findOne(@Param() params): Promise<User> {
      return this.userService.findOne(params.id);
    }

    // Get User/[id]
    @Post(':id/return/:bookId')
    async findOneAndReturnBook(@Param() params, @Res() res:Response,@Body() body ) {
      try {
        const success = await this.userService.returnBook(params.id, params.bookId, body.score);
        if (success) {
          res.status(HttpStatus.OK).send();
        }    
        else{
          res.status(HttpStatus.CONFLICT).send();
        }
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send() 
      }
    }

    // Get User/[id]
    @Post(':id/borrow/:bookId')
    async findOneAndBorrowBook(@Param() params, @Res() res:Response) {
      try {
        const success = await this.userService.borrowBook(params.id, params.bookId);
        if (success) {
          res.status(HttpStatus.OK).send();
        }    
        else{
          res.status(HttpStatus.CONFLICT).send();
        }
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send() 
      }
    }

    // Create User
    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() res:Response) {
        try {
          await this.userService.create(createUserDto)
          res.status(HttpStatus.CREATED).send();
        } catch (error) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send() 
        }
    }

   

    
}
