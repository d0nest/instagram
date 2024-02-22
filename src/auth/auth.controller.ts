import { Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService){}
    
    @Post('login')
    login(@Query('username') username: string, @Query('password') password: string){
        return this.authService.login(username,password)    
    }
    
    @Post('signUp')
    signUp(@Query('username') username: string, @Query('password') password: string){
        return this.authService.signUp(username,password)
    }
}
