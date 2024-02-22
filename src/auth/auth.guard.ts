import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private jwtService: JwtService){}
  async canActivate(context: ExecutionContext,){
    const req = context.switchToHttp().getRequest()
    const token = this.extractToken(req)
    
    if(!token){
        throw new UnauthorizedException()
    }
    
    try{
      const user = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        })
        req['user'] = user
    }
    catch(error){
        console.log('error: ', error)
    }
    return true;
  }
  
  extractToken(req: Request){
    const [type, token] = req.headers.authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined
  }
}
