import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  // for demo purposes
  @Get('username')
  getUsername() {
    return { username: 'John Doe' };
  }
}
