import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('TulioS API')
  .setDescription('Main API')
  .setVersion('0.0.1')
  .build();
