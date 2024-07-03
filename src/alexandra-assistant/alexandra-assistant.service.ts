import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  checkRunStatuUseCase,
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
  getMessagesListUseCase,
} from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class AlexandraAssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion(questiondto: QuestionDto) {
    const { threadId, question } = questiondto;
    await createMessageUseCase(this.openai, { threadId, question });
    const run = await createRunUseCase(this.openai, { threadId });
    await checkRunStatuUseCase(this.openai, { threadId, runId: run.id });
    const messages = await getMessagesListUseCase(this.openai, { threadId });
    return messages;
  }
}
