import { Body, Controller, UseGuards, Delete, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './schemas/user.schema';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() data: UserDto, @Req() req: Request | Record<string,any>): Promise<User> {
    return await this.usersService.update(data,req.user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req: Request | Record<string,any>): Promise<User> {
    return await this.usersService.delete(req.user.userId)
  }
}