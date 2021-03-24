import { Module } from '@nestjs/common';
import { QuestionsPoolController } from './questions-pool.controller';
import { QuestionsPoolService } from './questions-pool.service';

@Module({
  controllers: [QuestionsPoolController],
  providers: [QuestionsPoolService]
})
export class QuestionsPoolModule {}
