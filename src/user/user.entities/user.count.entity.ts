import { Column, Entity } from "typeorm";

export class CountEntity{
    @Column({default: 0})
    follows: number;
    
    @Column({default: 0})
    followers: number;
    
    @Column({default: 0})
    mediaCount: number;
}