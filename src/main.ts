import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // aqui se pueden configuracion para peticion CrossDomain los sitios permitidos por el proyecto
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
