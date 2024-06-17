import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
import { Response } from 'express';

// esto es parte de lo que esta en la ruta gpt
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(
    @Body() orthographyDto:OrthographyDto
  ){
    // return orthographyDto;
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(
    @Body() prosConsDiscusser:ProsConsDiscusserDto
  ){
    return this.gptService.prosConsDiscusser(prosConsDiscusser);
  }
  
  // de esta forma se construye la peticion para que se pueda hacer el steam de los datos que openai devuelve
  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(
    @Body() prosConsDiscusser:ProsConsDiscusserDto,
    @Res() res: Response
  ){
    const stream = await this.gptService.prosConsDiscusserStream(prosConsDiscusser);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await(const chunk of stream){
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }

    res.end();
    
  }

  @Post('translate')
  translate(
    @Body() translate:TranslateDto
  ){
    return this.gptService.translate(translate);
  }

  @Post('text-to-audio')
  textToAudio(
    @Body() textToAudioDto:TextToAudioDto
  ){
    return this.gptService.textToAudio(textToAudioDto);
  }




}
