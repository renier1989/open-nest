import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { createMessageUseCase, createRunUseCase, createThreadUseCase } from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class AlexandraAssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion(questiondto:QuestionDto){
    const { threadId,question} = questiondto
    const message = await createMessageUseCase(this.openai, {threadId,question});
    const run = await createRunUseCase(this.openai, {threadId});
    // return message;
  }


}
