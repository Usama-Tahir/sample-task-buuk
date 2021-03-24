import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestDocument = Test & Document;
function arrayLimit(val) {
  return val.length <= 4;
}
interface Questions {
  text: string;
  choices: string[];
}
interface Results {
  score: number;
  status: string;
  duration: string;
}
@Schema({
  autoCreate: true,
  timestamps: true,
})
export class Test {
  @Prop({ type: String, default: '', required: true })
  name: string;

  @Prop({ type: Array, default: [], required: true, validate: [arrayLimit, 'Maximum 4 question can be added'] })
  questions: Questions[];

  @Prop({ type: Array, default: [], required: true })
  results: Results[];
}

export const TestSchema = SchemaFactory.createForClass(Test);
