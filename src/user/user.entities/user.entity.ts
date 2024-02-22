import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CountDto } from "../count.dto";
import { CommentEntity } from "src/comment/comment.entity";
import { MediaEntity } from "src/media/media.entity";
import { CountEntity } from "./user.count.entity";

@Entity()
export class UserEntity{
    
    @PrimaryGeneratedColumn()
    id: string
    
    @Column({nullable : true})
    bio: string
    
    @Column(() => CountEntity)
    counts: CountEntity
    
    @Column({nullable: true})
    fullname: string
    
    @Column({ nullable: true })
    profilePicture: string
    
    @Column()
    username: string
    
    @Column({ nullable: true })
    website: string
    
    @Column()
    password: string
    
    // @Column()
    // accountType: string
    
    @ManyToMany(() => MediaEntity)
    @JoinTable()
    mediaLiked: MediaEntity[]
    
    @ManyToMany(() => UserEntity)
    @JoinTable()
    follows: UserEntity[]
    
    @ManyToMany(() => UserEntity)
    @JoinTable()
    followers: UserEntity[]
    
    @ManyToMany(() => UserEntity)
    @JoinTable()
    requests: UserEntity[]
    
    @ManyToMany(() => UserEntity)
    @JoinTable()
    requestSent: UserEntity[]  
    
    @OneToMany(() => MediaEntity, (medias) => medias.user)
    medias: MediaEntity[]
    
    @OneToMany(() => CommentEntity, (comments) => comments.user)
    comments: CommentEntity[]

}