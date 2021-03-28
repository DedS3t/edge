import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor (
    @InjectModel('User') private readonly userModel: mongoose.Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password.length < 6) {
      throw new HttpException('Password must be at least 6 characters', HttpStatus.BAD_REQUEST);
    }
    let createdUser: UserDocument = new this.userModel(createUserDto);
    createdUser.password = bcrypt.hashSync(createUserDto.password, 10);
    return createdUser.save();
  }

  async findById(id: User | string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username: username });
  }
}
