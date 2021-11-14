import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelInc, ModelIncDocument } from './schemas/modelInc.schema';

@Injectable()
export class ModelIncService {
  constructor(@InjectModel(ModelInc.name) private modelIncModel: Model<ModelIncDocument>) {}

  async getNextId(modelName): Promise<number>{
    let incr = await this.modelIncModel.findOne({ model: modelName});
    if(!incr) incr = await new this.modelIncModel({model:modelName}).save();
    incr.idx++;
    incr.save();
    return incr.idx;
  }

  
}
