import { Module } from '@nestjs/common';
import { ModelInc, ModelIncSchema } from './schemas/modelInc.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelIncService } from './modelInc.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelInc.name, schema: ModelIncSchema }],'LibraryDb'),
  ],
  controllers: [],
  providers: [ModelIncService],
  exports:[ModelIncService]
})
export class ModelIncModule {}
