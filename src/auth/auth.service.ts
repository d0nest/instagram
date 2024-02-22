import { plainToClass } from '@nestjs/class-transformer';
import { HttpException, HttpStatus, Inject, Injectable, Options, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    
    constructor(private userService: UserService, private jwtService: JwtService){}
    
    async login(username: string, password: string){
        const user = await this.userService.login(username,password)
        
        if(!user){
            throw new UnauthorizedException()
        }
        
        const payload = {subId: user.id, username: user.username }
         return { 
            access_token: this.jwtService.sign(payload)
         }
    }
    
    signUp(username: string, password: string){
        if (!this.validation(username, password)) {
            throw new HttpException("Invalid Credentials!", HttpStatus.BAD_REQUEST)
        }
        
        return this.userService.signUp(username, password)
    }
    
    validation(username: string, password: string) {
        if (username === null || password === null) {
            return false
        }
        else return true
    }
}
