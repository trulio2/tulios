import { Controller, Get, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { Response } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() response: Response) {
    response.sendFile('index.html', { root: 'build' })
  }

  @Get('version')
  version() {
    return '0.0.1'
  }
}
