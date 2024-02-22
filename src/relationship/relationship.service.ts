import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entities/user.entity';
import { Repository } from 'typeorm';
import { Action } from './relationship.actions.enum'
import { send } from 'process';

@Injectable()
export class RelationshipService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>){}
    
    async getRequestSent(userId: string){
        return (await this.userRepo.findOne({where: {id: userId}, relations: {requestSent: true}})).requestSent
    }
    
    async getRequestsRecived(userId: string){
        return (await this.userRepo.findOne({where: {id: userId}, relations: {requests: true, requestSent: true}})).requests
    }
    
    async getFollowers(userId: string){
        return (await this.userRepo.findOne({where: {id: userId}, relations: {followers: true}})).followers
    }
    
    async getFollows(userId: string){
        return (await this.userRepo.findOne({ where: { id: userId }, relations: { follows: true } })).follows
    }
    
    async getRelationShipWithAnother(a: string, b: string){
        
    }
    
    async modifyRelationship(action: string,a: string, b: string){
        const user = (await this.userRepo.findOne({ where: { id: b }, relations: { requests: true , followers: true, requestSent: true,follows: true} }))
        const sender = await this.userRepo.findOne({where: {id: a}, relations: {requests: true, followers: true,follows: true, requestSent: true}})
        const requestsRecived = user.requests
        const requestsSent = sender.requestSent
        let newReqRecived = []
        let newReqSent = []
        let newFollows = []
        let newFollowers = []
        
        switch(action){
            case Action.approve: 
                requestsRecived.forEach(element => {
                    if(element.id === a){
                            newReqRecived = requestsRecived.filter((requests) =>{
                            return requests !== element
                        })
                    }
                });
                requestsSent.forEach(element =>{
                    if (element.id === b) {
                        newReqSent = requestsSent.filter((requests) => {
                            return requests !== element
                        })
                    }
                })
                user.requests = newReqRecived
                sender.requestSent = newReqSent
                if(newReqRecived !== undefined){
                    user.counts.followers += 1
                    sender.counts.follows +=1
                    user.followers.push(sender)
                    sender.follows.push(user)
                }
                await this.userRepo.save(user)
                await this.userRepo.save(sender)
                break;
            
            case Action.ignore:
               requestsRecived.forEach((element) => {
                    if(element.id === a){
                        newReqRecived = requestsRecived.filter((request) => {
                            return request !== element
                        })
                    }
               })
               requestsSent.forEach((element) => {
                    if(element.id === b){
                        newReqSent = requestsSent.filter((request) => {
                            return request !== element
                        })
                    }
                })
                sender.requestSent = newReqSent
                user.requests = newReqRecived
                await this.userRepo.save(user)
                await this.userRepo.save(sender)
                break;
            
            case Action.follow:
                user.requestSent.push(sender)
                sender.requests.push(user)
                await this.userRepo.save(user)
                await this.userRepo.save(sender)
                break;
                
            case Action.unfollow:
                let follows = user.follows
                let followers = sender.followers
                followers.forEach((follower) =>{
                    if(follower.id === a){
                        newFollowers = followers.filter((flwr) => {
                            return flwr !== follower
                        })
                    }
                })
                follows.forEach((follow) =>{
                    if(follow.id === b){
                        newFollows = follows.filter((flw) => {
                            return flw !== follow
                        })
                    }
                })
                user.follows = newFollows
                sender.followers = newFollowers
                user.counts.follows -= 1
                sender.counts.followers -= 1
                await this.userRepo.save(user)
                await this.userRepo.save(sender)
                break;
        }
    }    
    
    async getCount(userId: string){
        return (await this.userRepo.findOne({where: {id: userId}, relations: {counts: true}})).counts
    }
}
