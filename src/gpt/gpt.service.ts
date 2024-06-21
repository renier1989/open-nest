import * as fs from 'fs';
import * as path from 'path';

import { Injectable, NotFoundException } from '@nestjs/common';
import { audiotoTextUseCase, orthographyCheckUseCase, prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase, textToAudioUseCase, translateUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
import OpenAI from 'openai';
import { AudioToTextDto } from './dtos/audioToText.dto';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // el service solo se va a encargar de hacer los llamos de los casos de uso
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return prosConsDiscusserUseCase(this.openai, { prompt });
  }
  
  async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return prosConsDiscusserStreamUseCase(this.openai, { prompt });
  }

  async translate({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, { prompt, lang });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter(fileId:string) {

    const filePath = path.resolve(__dirname, '../../generated/audios/', `${fileId}.mp3`);
    const fileFound = fs.existsSync(filePath);
    if(!fileFound) throw new NotFoundException(`File ${fileId} does not exist.`);
    return filePath;
  }

  async audioToText(audioFile : Express.Multer.File, audioToTextDto :AudioToTextDto) {
    const {prompt} = audioToTextDto // ya en el DTO esta definido que puede ser opcional
    return await audiotoTextUseCase(this.openai, { audioFile, prompt });
  }
}
