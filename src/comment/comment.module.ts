import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { MediaEntity } from 'src/media/media.entity';
import { UserEntity } from 'src/user/user.entities/user.entity';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [TypeOrmModule.forFeature([CommentEntity,UserEntity, MediaEntity])],
  exports: [CommentService]
})
export class CommentModule {}
