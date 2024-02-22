import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    
    constructor(private userService: UserService){}
    // search for user by name  
    //checked 
    @Get('search/q')
    getUsersByName(@Query('username') username: string, @Query('count') count: number){
        return this.userService.getUserByName(username,count)
    }
    
    //See the authenticated user's feed.
    //checked
    @UseGuards(AuthGuard)
    @Get('self/feed')
    getAuthenticatedUsersFeed(@Req() req){
        return this.userService.getAuthenticatedUsersFeed(req.user.subId)
    }
    
    //See the list of media liked by the authenticated user.
    //checked
    @UseGuards(AuthGuard)
    @Get('self/media/liked')
    getMediaLikedByAuthenticatedUser(@Req() req){
        return this.userService.getMediaLikedByAuthenticatedUser(req.user.subId)
    }
    
    //self + user-id + statusmessage
    //checked
    @Get(':id')
    getUsersBasicInformation(@Param('id') id: string){
        return this.userService.getUsersBasicInformation(id)
    }
    
    //Get the most recent media published by a user.
    //checked
    @UseGuards(AuthGuard)
    @Get('self/media/recent')
    getMostRecentMediaByAuthenticatedUser(@Param('id') userId: string, @Req() req){
        return this.userService.getMostRecentMediaByAuthenticatedUser(req.user.subId)
    }
    
    //checked
    @UseGuards(AuthGuard)
    @Post('update/details')
    updateDetails(@Body('user') user: UserDto, @Req() req){
        return this.userService.updateUser(req['user'].subId,user)
    }
    
    //checked
    @UseGuards(AuthGuard)
    @Post('send/request')
    sendARequest(@Query('userId') userId: string,@Req() req){
        return this.userService.sendARequest(userId,req.user.subId)
    }
    
    //checked
    @UseGuards(AuthGuard)
    @Get('friend/requests')
    getFriendRequests(@Req() req){
        return this.userService.getFriendRequests(req.user.subId)
    }
}
