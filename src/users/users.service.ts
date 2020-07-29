import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import validateEmpty  from '../util/validateEmpty';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(userDto: UserDto): Promise<any> {

    //VALIDATE FIELDS
    const fields = validateEmpty(userDto);
    if(fields.length){
      throw new HttpException('fields empty',HttpStatus.BAD_REQUEST);
    }
    
    //VALIDATE USER ACCOUNT
    const user = await this.userModel.findOne({username:userDto.username})

    //CREATE USER IF NOT EXISTS
    if(user){
      throw new HttpException('user already exists',HttpStatus.CONFLICT);
    }else{
      const hash = await bcrypt.hash(userDto.password, 8);
      const userCreated = new this.userModel({...userDto,password:hash});
      return userCreated.save();
    }

  }

  async findById(user_id: string): Promise<string | any> {

    try{

      const user = await this.userModel.findById(user_id);
      return user;

    }catch(err){

      throw new HttpException('user not exists',HttpStatus.BAD_REQUEST);

    }

  }

  async findOne(username: string): Promise<string | any> {

    try{
      const user = await this.userModel.findOne({username});
      return user;
    }catch(err){
      return null;
    }

  }

}