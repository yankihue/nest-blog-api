import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Blog } from './schemas/blog.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: mongoose.Model<Blog>,
  ) {}

  async findAll(query: Query): Promise<Blog[]> {
    const resPerPage = 2; // low # of results per page for demonstration purposes
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
    const data = Object.assign(blog, { author: user._id });

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
    return await this.blogModel.findByIdAndUpdate(id, blog, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<{ deleted: boolean }> {
    await this.blogModel.findByIdAndDelete(id);
    return { deleted: true };
  }
}
