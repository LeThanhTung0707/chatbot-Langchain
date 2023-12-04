import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('message') message: string) {
    return this.appService.getHello(message);
  }

  @Get('history1')
  getHistory1() {
    return this.appService.getHistory1();
  }
}
