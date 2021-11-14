import { Body, Controller, Get,  HttpStatus, Param, Post,  Res, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
    
    // Get Users
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Res() res:Response){
      try {
        const users = await this.userService.findAll();
        res.status(HttpStatus.OK).send(users);
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send() 
      }
    }

    // Get User/[id]
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param() params, @Res() res:Response) {
      try {
        const user = await this.userService.findOne({id:params.id});
        res.status(HttpStatus.OK).send(user);
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send() 
      }
    }

    // Get User/[id]
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
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
