import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // el service solo se va a encargar de hacer los llamos de los casos de uso
  orthographyCheck(orthographyDto: OrthographyDto) {
    return orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return prosConsDiscusserUseCase(this.openai, { prompt });
  }
  
  prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return prosConsDiscusserStreamUseCase(this.openai, { prompt });
  }
}
