import { Injectable } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModelIncDocument = ModelInc & Document;

@Injectable()
@Schema()
export class ModelInc {
    @Prop({required: true, index: { unique: true }})
    model:  string 

    @Prop({default: 0})
    idx: number;
}

export const ModelIncSchema = SchemaFactory.createForClass(ModelInc);

