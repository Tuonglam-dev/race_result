import { Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export class BaseEntity {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
  })
  id?: string;

  @Prop({
    type: MongooseSchema.Types.Boolean,
    default: false,
  })
  is_deleted?: boolean;
}
