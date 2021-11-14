import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export class Past extends Document {
    @Prop()
    name: string;
  
    @Prop()
    userScore: number;
  }

  export class Present extends Document {
    @Prop()
    name: string;
  }
export class Books extends Document {
    @Prop({ type: Past, default: []})
    past: Past[];
  
    @Prop({ type:Present, default: [] })
    present: Present[];
  }

 
@Schema()
export class User {
    @Prop()
    id: number

    @Prop()
    name: string;

    @Prop()
    userName:string;

    @Prop()
    password:string;

    @Prop({type: Books, default:{present:[], past:[]}})
    books: Books
}


  


export const UserSchema = SchemaFactory.createForClass(User);

