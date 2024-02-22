import { Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comment')
export class CommentController {

    constructor(private commentService: CommentService){}
    
    //checked
    @Get(':mediaId')
    getAListOfRecentCommentsOnAMediaObject(@Param('mediaId') mediaId: string) {
        return this.commentService.getAListOfRecentCommentsOnAMediaObject(mediaId)
    }
    
    
    //update
    // @UseGuards(AuthGuard)
    // @Delete('media/:mediaId/comment/:commentId')
    // deleteAComment(@Req() req, @Param('mediaId') mediaId: string, @Param('commentId') commentId: string){
    //     this.commentService.deleteAComment(req['user'].subId, mediaId, commentId)
    // }   
     
    //checked
    @UseGuards(AuthGuard)
    @Post(':mediaId/create')
    createAComment(@Param('mediaId') mediaId: string, @Query('comment') comment: string, @Req() req){
        return this.commentService.createAComment(mediaId,comment,req.user.subId)
    }
}
