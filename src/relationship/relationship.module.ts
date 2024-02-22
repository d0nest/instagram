import { Module } from '@nestjs/common';
import { RelationshipController } from './relationship.controller';
import { RelationshipService } from './relationship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entities/user.entity';

@Module({
  controllers: [RelationshipController],
  providers: [RelationshipService],
  exports: [RelationshipService],
  imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class RelationshipModule {}
