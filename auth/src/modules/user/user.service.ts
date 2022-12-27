import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientKafka,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUser(userData) {
    const user = await this.userModel.create({
      ...userData,
      password: await argon2.hash(userData.password),
    });

    this.notificationClient.emit('notification.created', {
      title: 'User created',
      ...userData,
    });
    return user;
  }

  async loginUser(loginData) {
    const user = await this.userModel.findOne({ email: loginData.email });
    return user;
  }
}
