import { Injectable, Req } from '@nestjs/common';
import { MediaDto } from './media.dto';
import { InjectRepository, getDataSourceName } from '@nestjs/typeorm';
import { MediaEntity } from './media.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entities/user.entity';
import { plainToClass } from '@nestjs/class-transformer';
import { UserDto } from 'src/user/user.dto';

@Injectable()
export class MediaService {
    
    constructor(@InjectRepository(MediaEntity) private mediaRepo: Repository<MediaEntity>, @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>){}
    
    async getTheListOfCurrentPopularMedia(userId: string){
        //time + likes = popularity
        // const follows = (await this.userRepo.findOne({where: {id: userId}, relations: {follows: {medias: true}} })).follows
        // const medias = []
        // let likeWise =[]
        // let newlike = []
        // follows.forEach((user) => {
        //     medias.push(user.medias)
        // })
        // likeWise = medias.sort((a,b) => {
        //     return b.createdTime - a.createdTime
        // })
        // for(let i = likeWise.length ; i >= 0; i--){
        //     newlike.push(likeWise[i])
        // }
        // return newlike
        // remove a set of old media from likeWise
        // rearrange the remaining set of recent media in in decending order of likes
        // return the array
        //update
        return (await this.userRepo.findOne({where: {id: userId}, relations: {follows: {medias: true}, medias: true}}))
    }
    
    //checked
    async getInfoAboutAMediaObject(mediaId: string){
        return await this.mediaRepo.findOne({where: {id: mediaId}, relations:{user: true, comments: true}})    
    }
    
    //checked
    async likeAMedia(userId: string, mediaId: string){
        const media = await this.mediaRepo.findOne({where: {id: mediaId}, relations: {likedBy: true}})
        const user = await this.userRepo.findOne({where:{id: userId}, relations: {mediaLiked: true}})
        media.likedBy.push(user)
        media.likes += 1
        user.mediaLiked.push(media)
        await this.mediaRepo.save(media)
        await this.userRepo.save(user)
    }
    
    //checked
    async getMyMedia(userId: string){
        return await this.userRepo.find({where: {id: userId}, relations: {medias: true}})
    }
    
    //checked
    async createAPost(media: MediaDto,id: string){
        const user = await this.userRepo.findOne({where:{id: id}})
        media.user = plainToClass(UserDto,user)
        media.createdTime = new Date
        console.log('time: ', `{${media.createdTime}  ${media}}`)
        return await this.mediaRepo.save(media)
    }
}
