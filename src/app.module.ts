import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MediaModule } from './media/media.module';
import { CommentModule } from './comment/comment.module';
import { LocationModule } from './location/location.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entities/user.entity';
import { MediaEntity } from './media/media.entity';
import { CommentEntity } from './comment/comment.entity';
import { RelationshipModule } from './relationship/relationship.module';

@Module({
  imports: [RelationshipModule, AuthModule, UserModule, MediaModule, CommentModule, LocationModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'd0nest',
    database: 'instagram',
    entities: [UserEntity,MediaEntity,CommentEntity],
    synchronize: true
  })],
  
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
