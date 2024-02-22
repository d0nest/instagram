import { MediaEntity } from "src/media/media.entity";
import { UserEntity } from "src/user/user.entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentEntity{
    
    @PrimaryGeneratedColumn()
    id: string
    
    @Column()
    comment: string
    
    @Column()
    createdTime: Date
    
    @ManyToOne(() => UserEntity, user => user.comments)
    user: UserEntity
    
    @ManyToOne(() => MediaEntity, media => media.comments)
    media: MediaEntity
}