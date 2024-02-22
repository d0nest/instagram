import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RelationshipService } from './relationship.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Action } from './relationship.actions.enum';

@Controller('relationship')
export class RelationshipController {
    
    constructor(private relationshipService: RelationshipService){}
    
    //checked
    @UseGuards(AuthGuard)
    @Get('count')
    getCount(@Req() req){
        return this.relationshipService.getCount(req.user.subId)
    }
    
    //checked
    @UseGuards(AuthGuard)
    @Get('requests/recived')
    getRequestsRecived(@Req() req){
        return this.relationshipService.getRequestsRecived(req.user.subId)
    }
    
    //checked
    @UseGuards(AuthGuard)
    @Get('requests/sent')
    getRequestsSent(@Req() req) {
        return this.relationshipService.getRequestSent(req.user.subId)
    }
    
    //checked
    @UseGuards(AuthGuard)
    @Get('followers')
    getFollowers(@Req() req){
        return this.relationshipService.getFollowers(req.user.subId)
    }
    
    //checked
    @UseGuards(AuthGuard)
    @Get('follows')
    getFollows(@Req() req){
        return this.relationshipService.getFollows(req.user.subId)
    }
    
    //Update
    @UseGuards(AuthGuard)
    @Get(':user-id')
    getRelationshipWithAnother(@Req() req, @Param('user-id') userId: string){
        this.relationshipService.getRelationShipWithAnother(req.user.subId, userId)
    }
    
    //Checking
    @UseGuards(AuthGuard)
    @Post('modify/:action/:id')
    modifyRelationship(@Param('action') action: Action, @Param('id') userId: string, @Req() req){
        this.relationshipService.modifyRelationship(action,userId, req.user.subId)
    }
}
