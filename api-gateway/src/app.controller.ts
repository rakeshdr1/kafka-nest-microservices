import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserLoginDto } from './common/dto/user-login.dto';
import { UserRegisterDto } from './common/dto/user-register.dto';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  onModuleInit() {
    const subscriptionTopics = ['say.hello', 'register.user', 'login.user'];

    subscriptionTopics.forEach((topic) =>
      this.authClient.subscribeToResponseOf(topic),
    );
  }

  @Get()
  getHello() {
    return this.authClient.send('say.hello', { ip: '127.0.0.1' });
  }

  @Post('register')
  registerUser(@Body() registerData: UserRegisterDto) {
    return this.authClient.send('register.user', JSON.stringify(registerData));
  }

  @Post('login')
  loginUser(@Body() loginData: UserLoginDto) {
    return this.authClient.send('login.user', JSON.stringify(loginData));
  }
}
