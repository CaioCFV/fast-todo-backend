import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async signin(@Req() req: Request): Promise<any> {
        return await this.authService.signin(req.user);
    }

    @Post('/signup')
    async singup(@Req() req: Request): Promise<any> {
        return await this.authService.signup(req.body);
    }

}
