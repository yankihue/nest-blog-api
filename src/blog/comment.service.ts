import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Blog } from './schemas/blog.schema';
import { User } from '../auth/schemas/user.schema';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: mongoose.Model<Blog>,
    @InjectModel(Comment.name)
    private commentModel: mongoose.Model<Comment>,
  ) {}

  async findByBlogPost(blogId: string): Promise<Comment[]> {
    const isValidId = mongoose.isValidObjectId(blogId);

    if (!isValidId) {
      throw new BadRequestException('Given blog ID is not valid.');
    }

    const post = await this.blogModel.findById(blogId);

    if (!post) {
      throw new NotFoundException('Blog post not found.');
    }

    const relatedComments = this.commentModel.find({
      $lookup: {
        from: 'parent',
        localField: 'parent',
        foreignField: '_id',
        as: 'parent',
      },
      $match: {
        'parent.id': blogId,
      },
    });
    return relatedComments;
  }

  async create(comment: Comment, blogId: string, user: User): Promise<Comment> {
    const data = Object.assign(
      comment,
      { parent: blogId },
      { author: user._id },
      { authorName: user.name },
    );

    const res = await this.commentModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Comment> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Given ID is not valid.');
    }

    const post = await this.commentModel.findById(id);

    if (!post) {
      throw new NotFoundException('Blog post not found.');
    }

    return post;
  }

  async deleteById(id: string): Promise<{ deleted: boolean }> {
    await this.commentModel.findByIdAndDelete(id);
    return { deleted: true };
  }
}
