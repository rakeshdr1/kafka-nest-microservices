import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('say.hello')
  sayHello(data) {
    console.log(data);
    return this.appService.getHello();
  }

  @MessagePattern('register.user')
  createUser(userData) {
    console.log(userData);
    return this.appService.createUser(userData);
  }
}
