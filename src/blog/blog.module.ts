import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogSchema } from './schemas/blog.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
