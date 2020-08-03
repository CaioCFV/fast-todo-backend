import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async signin(@Req() req: Request | Record<string,any>): Promise<any> {
        return await this.authService.signin(req.user);
    }

    @Post('/signup')
    async singup(@Req() req:  Request | Record<string,any>): Promise<any> {
        return await this.authService.signup(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/userinfo')
    async getUserInfo(@Req() req:  Request | Record<string,any>): Promise<any> {
        return await this.authService.getUserInfo(req.user);
    }
}
