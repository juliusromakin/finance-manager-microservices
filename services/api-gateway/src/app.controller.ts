import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { timestamp } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealthCheck(){
    return {
      status: 'UP',
      service: 'API Gateway',
      timestamp: new Date().toISOString(),
    };
  }
}
