import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaEntity } from 'src/media/media.entity';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentDto } from './comment.dto';
import { UserEntity } from 'src/user/user.entities/user.entity';

@Injectable()
export class CommentService {
    
    constructor(@InjectRepository(MediaEntity) private mediaRepo: Repository<MediaEntity>, @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>, @InjectRepository(CommentEntity) private commentRepo: Repository<CommentEntity>){}
    
    // //try this out!
    // async deleteAComment(userId: string, mediaId: number, commentId: string){
    //     this.commentRepo.delete()
    // }
    
    async getAListOfRecentCommentsOnAMediaObject(mediaId: string) {
        return await this.mediaRepo.findOne({where: {id: mediaId} , relations: {comments: {user: true}}})
    }
    
    async createAComment(mediaId: string, text: string,userid: string){
        const media = await this.mediaRepo.findOne({where: {id: mediaId}})
        const user = await this.userRepo.findOne({where: {id: userid}})
        
        const comment = new CommentDto()
        comment.comment = text
        comment.createdTime = new Date()
        comment.media = media
        comment.user = user
        return await this.commentRepo.save(comment)
    }
}
