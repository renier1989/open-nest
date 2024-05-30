import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos';

// esto es parte de lo que esta en la ruta gpt
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(
    @Body() orthographyDto:OrthographyDto
  ){
    return orthographyDto;
    // return this.gptService.orthographyCheck();
  }




}
