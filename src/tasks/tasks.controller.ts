import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/create-task.dto';
import { Task } from './schemas/task.schema';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() createTaskDto: TaskDto ): Promise<any> {

    const result = await this.tasksService.create(createTaskDto, req.user);

    return result;

  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

}