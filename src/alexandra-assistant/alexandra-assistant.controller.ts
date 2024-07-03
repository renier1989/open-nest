import { Body, Controller, Post } from '@nestjs/common';
import { AlexandraAssistantService } from './alexandra-assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('alexandra-assistant')
export class AlexandraAssistantController {
  constructor(private readonly alexandraAssistantService: AlexandraAssistantService) {}


  @Post('create-thread')
  async createThread(){
    return 'create-thread';
  }

  @Post('user-question')
  async userQuestion(
    @Body() questionDto: QuestionDto
  ){
    return questionDto;
  }

}
