import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(userData) {
    const user = userData;
    console.log(user);

    this.notificationClient.emit('notification.created', {
      title: 'User created',
      ...userData,
    });
    return user;
  }

  loginUser(loginData) {
    const user = loginData;
    console.log(user);
    return user;
  }
}
