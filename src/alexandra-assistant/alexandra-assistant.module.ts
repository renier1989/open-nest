import { Module } from '@nestjs/common';
import { AlexandraAssistantService } from './alexandra-assistant.service';
import { AlexandraAssistantController } from './alexandra-assistant.controller';

@Module({
  controllers: [AlexandraAssistantController],
  providers: [AlexandraAssistantService],
})
export class AlexandraAssistantModule {}
