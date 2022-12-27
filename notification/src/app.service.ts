import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  notifications = [];

  getNotifications() {
    return this.notifications;
  }

  handleNotificationCreated(notificationData) {
    console.log('logged created notification');
    this.notifications.push({
      ...notificationData,
    });
  }
}
