import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createUser(userData) {
    const user = userData;
    console.log(user);
    return user;
  }
}
