import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { AlexandraAssistantModule } from './alexandra-assistant/alexandra-assistant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GptModule,
    AlexandraAssistantModule
  ]
})
export class AppModule {}
