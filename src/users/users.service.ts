import { Injectable, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
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
      throw new HttpException('Existem campos vazios',HttpStatus.BAD_REQUEST);
    }
    
    //VALIDATE USER ACCOUNT
    const user = await this.userModel.findOne({username:userDto.username})

    //CREATE USER IF NOT EXISTS
    if(user){
      throw new HttpException('Nome de usuário indisponível',HttpStatus.CONFLICT);
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
      throw new HttpException('Usuário nao existe',HttpStatus.BAD_REQUEST);
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

  async update(data: UserDto, userId: string): Promise<any>{
    //validate to username
    if(data.username){
      throw new HttpException('Nome de usuário não pode ser alterado',HttpStatus.FORBIDDEN);
    }

    //validate to empty fields
    const fieldsEmpty = validateEmpty(data);
    if(fieldsEmpty.length){
      throw new HttpException('Existem campos vazios',HttpStatus.BAD_REQUEST);
    }

    //validate to password update
    if(data.password){
      const hash = await bcrypt.hash(data.password, 8);
      const newData = {...data,password:hash}
      return await this.userModel.updateOne({_id:userId}, newData);
    }

    //update commom fields
    const updated = await this.userModel.updateOne({_id:userId}, data);

    return updated;
  }

  async delete(userId:string): Promise<any>{
    try{
      return await this.userModel.deleteOne({_id:userId});
    }catch(err){
      throw new BadRequestException();
    }
  }

}