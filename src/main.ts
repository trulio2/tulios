import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from '../doc/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documment = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/doc', app, documment);

  await app.listen(3000);
}
bootstrap();
