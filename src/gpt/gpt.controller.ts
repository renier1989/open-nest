import { Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';

// esto es parte de lo que esta en la ruta gpt
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(){
    return this.gptService.orthographyCheck();
  }




}
