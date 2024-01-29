import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogSchema } from './schemas/blog.schema';
import { CommentService } from './comment.service';
import { CommentSchema } from './schemas/comment.schema';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Blog', schema: BlogSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService, CommentService],
})
export class BlogModule {}
