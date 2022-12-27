import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserLoginDto } from './common/dto/user-login.dto';
import { UserRegisterDto } from './common/dto/user-register.dto';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    const authTopics = ['say.hello', 'register.user', 'login.user'];
    const notificationTopics = ['notification.get'];

    authTopics.forEach((topic) =>
      this.kafkaClient.subscribeToResponseOf(topic),
    );
    notificationTopics.forEach((topic) =>
      this.kafkaClient.subscribeToResponseOf(topic),
    );
  }

  @Get()
  getNotifications() {
    return this.kafkaClient.send('notification.get', '');
  }

  @Post('register')
  registerUser(@Body() registerData: UserRegisterDto) {
    return this.kafkaClient.send('register.user', JSON.stringify(registerData));
  }

  @Post('login')
  loginUser(@Body() loginData: UserLoginDto) {
    return this.kafkaClient.send('login.user', JSON.stringify(loginData));
  }
}
