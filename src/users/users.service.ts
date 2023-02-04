import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/createUser.dto'
import { Model } from 'mongoose'
import { User } from './users.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async getById(id: number){
    const user = await  this.userModel.findOne({username});
    if (user) {
      return user
    } throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }
  
  async getByEmail(email: string){
    const user = await this.userModel({username});
    if (user) {
      return user;
    } throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto){
    const newUser = await this.userModel(userData); 
    await this.newUser.save(); 
    return newUser; 
  }
}
