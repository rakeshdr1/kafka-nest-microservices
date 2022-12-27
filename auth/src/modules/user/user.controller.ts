import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('register.user')
  createUser(userData) {
    return this.userService.createUser(userData);
  }

  @MessagePattern('login.user')
  loginUser(loginData) {
    return this.userService.loginUser(loginData);
  }
}
