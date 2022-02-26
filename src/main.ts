import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('TulioS API')
    .setDescription('Main API')
    .setVersion('0.0.1')
    .build()

  const documment = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/doc', app, documment)

  await app.listen(process.env.PORT || 3001)
}
bootstrap()
