import { Injectable, HttpStatus, HttpException, Inject, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from './dto/create-task.dto';
import { Task } from './schemas/task.schema';
import { UsersService } from '../users/users.service';
import validateEmpty from '../util/validateEmpty';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    @Inject('UsersService') private usersService: UsersService
  ) {}

  async create(createTaskDto: TaskDto, userId: string): Promise<any> {
      const validateUser = await this.usersService.findById(userId);
      if(validateUser.status){
        throw new BadRequestException();
      }
      const task = await this.taskModel.findOne({name:createTaskDto.name,user_id:userId})
      if(task){
        throw new HttpException('Já existe uma tarefa com este nome',HttpStatus.CONFLICT);
      }else{
        const taskCreated = new this.taskModel({...createTaskDto, user_id:userId});
        return taskCreated.save();
      }
  }

  async index(userId: string): Promise<Task[]> {
      return this.taskModel.find({user_id:userId}).exec();
  }

  async update(taskId: string, data: TaskDto, userId: string): Promise<any>{

    //validate to empty fields
    const fieldsEmpty = validateEmpty(data);
    if(fieldsEmpty.length){
      throw new HttpException('Existem campos vazios',HttpStatus.BAD_REQUEST);
    }
    
    if(data.name){
      try{
        const task = await this.taskModel.findOne({name:data.name,user_id:userId});
        console.log(task)
        if(task){
          throw new BadRequestException();
        }
      }catch(err){
        throw new HttpException('Tarefa já existe ou não foi encontrada',HttpStatus.CONFLICT);
      }
    }
    try{
      return await this.taskModel.updateOne({_id:taskId,user_id:userId},data)
    }catch(err){
      throw new BadRequestException();
    }
   
  }

  async delete(taskId:string, userId:string): Promise<any>{
    try{
      return await this.taskModel.deleteOne({_id:taskId,user_id:userId});
    }catch(err){
      throw new BadRequestException();
    }
  }
  
}