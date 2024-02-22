import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from '@nestjs/class-transformer';
import { MediaEntity } from 'src/media/media.entity';
import { take } from 'rxjs';

@Injectable()
export class UserService {
    
    constructor(private jwtService: JwtService, @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>, @InjectRepository(MediaEntity) private mediaRepo: Repository<MediaEntity>){}
    
    async sendARequest(reciversId: string,sendersId: string){
        const reciver = await this.userRepo.findOne({where: {id: reciversId}, relations:{requests: true, requestSent: true}})
        const sender = await this.userRepo.findOne({where: { id: sendersId }, relations: { requests: true, requestSent: true } })
        reciver.requests.push(sender)
        sender.requestSent.push(sender)
        await this.userRepo.save(reciver)
        await this.userRepo.save(sender)
    }
    
    // return/select only requests array
    async getFriendRequests(userId: string){
        return await this.userRepo.find({where: {id: userId}, relations: {requests: true}})
    }
    
    async getUsersBasicInformation(userid: string) {
        return await this.userRepo.findOne({where: {id: userid}, select: {fullname: true, username: true, bio: true, id: true, profilePicture: true, website: true}})
    }

    async getMostRecentMediaByAuthenticatedUser(userId: string) {
        return await this.userRepo.findOne({where: {id: userId}, select: {medias: true, comments: true}, relations: {medias:  {comments: true}}})
    }
    
    //test 
    async getMediaLikedByAuthenticatedUser(userId: string) {
        return (await this.userRepo.findOne({where: {id: userId}, relations: {mediaLiked: true}})).mediaLiked
    }
    
    async getAuthenticatedUsersFeed(userId: string) {
        // feed  comprises of posts by user himself and his friends
        // time constrain of upload will be used generate a list from latest to old
        return (await this.userRepo.findOne({where: {id: userId}, relations: {follows: {medias: true}, medias: true}}))
        
    }
    
    //done
    async getUserByName(username: string,count: number){
        return await this.userRepo.find({ where: {username: username}, take: count})
    }
    
    async updateUser(id: string, user: UserDto){
        const user1  = await this.userRepo.findOne({where: {id: id}})
        return await this.userRepo.save({ ...user1, ...user })
    }
    
    /* section below is responsible for logging and signing the user up */
    async login(username: string, password: string){         
        return await this.userRepo.findOne({where: {username: username, password: password}})
    }
   
    async signUp(username: string, password: string){  
        return await this.userRepo.save({username: username, password: password})
    }
}