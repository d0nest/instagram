import { CommentDto } from "src/comment/comment.dto";
import { CommentEntity } from "src/comment/comment.entity";
import { UserDto } from "src/user/user.dto";
import { UserEntity } from "src/user/user.entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MediaEntity{
    
    @PrimaryGeneratedColumn()
    id: string
    
    @Column()
    attribution: string
    
    @Column()
    createdTime: Date
    
    @Column()
    filter: string
    
    @Column()
    link: string
    
    @Column()
    type: string
    
    @Column({default: 0})
    likes: number
    
    @ManyToOne(() => UserEntity, user => user.medias)
    user: UserEntity
    
    @OneToMany(() => CommentEntity, comments => comments.media)
    comments: CommentEntity[]
    
    @ManyToMany(() => UserEntity)
    @JoinTable()
    likedBy: UserEntity[]
}