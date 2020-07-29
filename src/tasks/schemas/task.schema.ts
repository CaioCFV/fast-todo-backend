import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {

  @Prop()
  name: string;

  @Prop()
  done: string;

  @Prop()
  status: string;
  
  @Prop()
  date: Date;

  @Prop()
  user_id: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);