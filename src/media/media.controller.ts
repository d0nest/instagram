import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { MediaDto } from './media.dto';
import { MediaService } from './media.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('media')
export class MediaController {
    
    constructor(private mediaService : MediaService){}
    
    //checked
    @UseGuards(AuthGuard)
    @Get('popular')
    getTheListOfCurrentPopularMedia(@Req() req){
        return this.mediaService.getTheListOfCurrentPopularMedia(req.user.subId)
    }
    
 
    //checked
    @Get(':mediaId')
    getInfoAboutAMediaObject(@Param('mediaId') mediaId: string){
        return this.mediaService.getInfoAboutAMediaObject(mediaId)
    }
    
    //temp 
    @UseGuards(AuthGuard)
    @Get('like/:mediaId')
    likeAMedia(@Req() req, @Param('mediaId') mediaId: string){
        return this.mediaService.likeAMedia(req['user'].subId,  mediaId)
    }
    
    //temp
    //checked
    @UseGuards(AuthGuard)
    @Get('get/my/media')
    getMyMedia(@Req() req){
        return this.mediaService.getMyMedia(req.user.subId)
    }
    
    //checked
    @UseGuards(AuthGuard)
    @Post('create')
    createAPost(@Body('media') media: MediaDto,@Req() req){
        return this.mediaService.createAPost(media,req['user'].subId)
    }
}
