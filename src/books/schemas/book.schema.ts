import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop()
    kind: string;

    @Prop()
    name: string;

    @Prop()
    id: number;

    @Prop()
    googleId: string;
    
    @Prop()
    selfLink: string;
    
    @Prop({type: Array})
    authors:[string]

    @Prop()
    language: string;

    @Prop()
    publishedDate: string;

    @Prop({ default: false})
    isBorrowed: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);