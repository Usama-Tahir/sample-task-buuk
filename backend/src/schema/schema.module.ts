import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './test.schema';
import { QuestionsPool, QuestionsPoolSchema } from './questionsPool.schema';

const schemas = [
  MongooseModule.forFeature([
    {
      name: Test.name,
      schema: TestSchema,
      collection: 'tests',
    },
    {
      name: QuestionsPool.name,
      schema: QuestionsPoolSchema,
      collection: 'questionsPool',
    },
  ]),
];

@Global()
@Module({
  imports: schemas,
  exports: schemas,
})
export class SchemaModule {
  static forRoot(): DynamicModule {
    return {
      module: SchemaModule,
      exports: schemas,
      global: true,
    };
  }
}
