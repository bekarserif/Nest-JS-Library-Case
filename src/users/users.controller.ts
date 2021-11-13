import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express'
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
    findOne(@Param() params): string {
      console.log(params.id);
      return `This action returns a #${params.id} user`;
    }

    // Get User/[id]
    @Post(':id/return/:bookId')
    findOneAndReturnBook(@Param() params): string {
      console.log(params.id);
      console.log(params.bookId);
      return `#${params.id} User returns ${params.bookId}`;
    }

    // Get User/[id]
    @Post(':id/borrow/:bookId')
    findOneAndBorrowBook(@Param() params): string {
    console.log(params.id);
    console.log(params.bookId);
    return `#${params.id} User borrows ${params.bookId}`;
    }

    // Create User
    @Post()
    @HttpCode(201)
    async create(@Body() createUserDto: CreateUserDto) {
        try {
          await this.userService.create(createUserDto)
        } catch (error) {
          
        }
    }

   

    
}
