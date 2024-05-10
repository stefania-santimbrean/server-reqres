import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject('USER_SERVICE') private rabbitClient: ClientProxy,
    private mailerService: MailerService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel({
      ...createUserDto,
      id: Math.floor(Math.random() * 1000), // number can be greater, or can increase incrementally
    });
    this.rabbitClient.emit('user-created', createdUser);
    this.mailerService.sendMail({
      to: createdUser.email,
      from: 'admin@noreply.ro',
      subject: 'Your user was created!',
      text: `Dear ${createdUser.first_name}, your user was successfully created!`,
    });
    return createdUser.save();
  }

  async findOne(id: number): Promise<User> {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://reqres.in/api/users/${id}`),
    );
    return data.data;
  }

  async findAvatar(id: number) {
    if (await this.userModel.exists({ id })) {
      const user = await this.userModel.findOne({ id });
      return user.avatar;
    } else {
      const { data } = await firstValueFrom(
        this.httpService.get(`https://reqres.in/api/users/${id}`),
      );
      const img = await firstValueFrom(
        this.httpService.get(data.data.avatar, {
          responseType: 'arraybuffer',
        }),
      );
      const createdUser = new this.userModel({
        id: data.data.id,
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        email: data.data.email,
        avatar: Buffer.from(img.data).toString('base64'),
      });
      createdUser.save();
      return createdUser.avatar;
    }
  }

  removeAvatar(id: number) {
    // what file from the FileSystem storage?
    return this.userModel.updateOne({ id }, { avatar: null });
  }
}
