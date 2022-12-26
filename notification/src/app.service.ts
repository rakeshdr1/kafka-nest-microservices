import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  notifications = [];

  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(userData) {
    console.log('user created notification');
    this.notifications.push({ type: 'user.crested', ...userData });
  }
}
