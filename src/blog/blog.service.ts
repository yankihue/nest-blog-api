import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Blog } from './schemas/blog.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: mongoose.Model<Blog>,
    private authService: AuthService,
  ) {}

  async findAll(query: Query): Promise<Blog[]> {
    const resPerPage = Number(query.size) || 2; // low # of results per page for demonstration purposes
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const posts = await this.blogModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return posts;
  }

  async create(blog: Blog, user: User): Promise<Blog> {
    const data = Object.assign(blog, { author: user?._id ?? null });

    const res = await this.blogModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Blog> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Given ID is not valid.');
    }

    const post = await this.blogModel.findById(id);

    if (!post) {
      throw new NotFoundException('Blog post not found.');
    }

    return post;
  }

  async updateById(id: string, blog: Blog): Promise<Blog> {
    const blogPost = await this.findById(id);
    const isPostOwner = await this.authService.isPostOwner(id, blogPost);
    if (!isPostOwner) {
      throw new UnauthorizedException(
        'This post does not belong to you. You cannot modify it.',
      );
    }
    return await this.blogModel.findByIdAndUpdate(id, blog, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<{ deleted: boolean }> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Given ID is not valid.');
    }

    const blogPost = await this.findById(id);

    if (!blogPost) {
      throw new NotFoundException('Blog post not found.');
    }
    const isPostOwner = await this.authService.isPostOwner(id, blogPost);
    if (!isPostOwner) {
      throw new UnauthorizedException(
        'This post does not belong to you. You cannot delete it.',
      );
    }
    await this.blogModel.findByIdAndDelete(id);
    return { deleted: true };
  }
}
