import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { createThreadUseCase } from './use-cases';

@Injectable()
export class AlexandraAssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }
}
