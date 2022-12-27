import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('notification.get')
  getNotifications() {
    return this.appService.getNotifications();
  }

  @EventPattern('notification.created')
  handleOrderCreated(data: any) {
    this.appService.handleNotificationCreated(data);
  }
}
