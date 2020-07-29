import { Injectable, HttpStatus, HttpException, Inject, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from './dto/create-task.dto';
import { Task } from './schemas/task.schema';
import { UsersService } from '../users/users.service';


@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    @Inject('UsersService') private usersService: UsersService
  ) {}

  async create(createTaskDto: TaskDto, user: Record<string,any>): Promise<any> {
    
    //verifica se existe usuário com o id
    const validateUser = await this.usersService.findById(user.userId);

    if(validateUser.status){
       throw new BadRequestException();
    }
    
    //cria a tarefa
    const task = await this.taskModel.findOne({name:createTaskDto.name,user_id:user.userId})

    if(task){

      throw new HttpException('task name already exists',HttpStatus.CONFLICT);

    }else{

      const taskCreated = new this.taskModel({...createTaskDto, user_id:user.userId});
      return taskCreated.save();

    }

  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }
}