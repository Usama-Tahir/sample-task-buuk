import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionsPoolDocument = QuestionsPool & Document;

@Schema({
  autoCreate: true,
  timestamps: true,
})
export class QuestionsPool {
  @Prop({ type: String, default: '', required: true })
  text: string;

  @Prop({ type: Array, default: [], required: true })
  choices: string[];

  @Prop({ type: String, default: '42', required: true })
  correctAnswer: string;
}

export const QuestionsPoolSchema = SchemaFactory.createForClass(QuestionsPool);
