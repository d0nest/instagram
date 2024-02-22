import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from './media.entity';
import { UserEntity } from 'src/user/user.entities/user.entity';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  imports: [TypeOrmModule.forFeature([MediaEntity,UserEntity])],
  exports: [MediaService]
})
export class MediaModule {}
