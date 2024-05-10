import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel({
      ...createUserDto,
      id: Math.floor(Math.random() * 1000), // number can be greater, or can increase incrementally
    });
    return createdUser.save();
  }

  async findOne(id: number): Promise<User> {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://reqres.in/api/users/${id}`),
    );
    return data.data;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
