import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user) {
            const validate = await bcrypt.compare(password,user.password);
            if(validate){
                return user;
            }
        }else{
            throw new HttpException('Usuário não encontrado',HttpStatus.NOT_FOUND);
        }
        return null;
    }

    async signin(user: UserDto): Promise<any> {
        const payload = { username: user.username, sub: user._id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }

    async signup(user: UserDto): Promise<any> {
        const createdUser = await this.usersService.create(user)
        const payload = { username: createdUser.username, sub: createdUser._id };

        return {
          access_token: this.jwtService.sign(payload),
        };
    }

    async getUserInfo(user: Record<string,any>): Promise<any> {
        try{
            const userInfo = await this.usersService.findById(user.userId);
            return userInfo;
        }catch(err){
            throw new UnauthorizedException();
        }
    }

}
