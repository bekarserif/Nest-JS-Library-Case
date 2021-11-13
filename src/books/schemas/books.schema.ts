import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
    name: string;
    userName:string;
    password:string;
    books:{
        past:[{
            name:string;
            userScore:number
        }],
        present:[{
            name:string
        }]
    }
}

export const BookSchema = SchemaFactory.createForClass(Book);