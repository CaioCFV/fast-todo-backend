import { Body, Controller,Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { AuthService} from '../auth/auth.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() userDto: UserDto): Promise<any> {
  //   const result = await this.usersService.create(userDto);
  //   return result;
  // }

  // @Get(':user_id')
  // async findByPk(@Param() user_id:string ): Promise<string> {
  //   return this.usersService.findById(user_id);
  // }
}