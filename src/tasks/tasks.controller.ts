import { Body, Controller, Get, Post, UseGuards, Req, Param, Patch, Delete } from '@nestjs/common';
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
  async create(@Req() req: Request | Record<string,any>, @Body() createTaskDto: TaskDto ): Promise<any> {
    const result = await this.tasksService.create(createTaskDto, req.user.userId);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@Req() req: Request | Record<string,any>): Promise<Task[]> {
    return await this.tasksService.index(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() data: TaskDto, @Param('id') taskId: string, @Req() req: Request | Record<string,any>): Promise<Task> {
    return await this.tasksService.update(taskId,data,req.user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') taskId: string, @Req() req: Request | Record<string,any>): Promise<Task> {
    return await this.tasksService.delete(taskId,req.user.userId)
  }
  
}