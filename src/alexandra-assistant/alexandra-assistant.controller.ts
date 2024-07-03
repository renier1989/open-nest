import { Body, Controller, Post } from '@nestjs/common';
import { AlexandraAssistantService } from './alexandra-assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('alexandra-assistant')
export class AlexandraAssistantController {
  constructor(private readonly alexandraAssistantService: AlexandraAssistantService) {}


  @Post('create-thread')
  async createThread(){
    return await this.alexandraAssistantService.createThread();
  }

  @Post('user-question')
  async userQuestion(
    @Body() questionDto: QuestionDto
  ){
    return await this.alexandraAssistantService.userQuestion(questionDto);
  }

}
