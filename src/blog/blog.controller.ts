import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './schemas/blog.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async getAllBlogs(@Query() query: ExpressQuery): Promise<Blog[]> {
    return this.blogService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBlog(
    @Body()
    blog: CreateBlogDto,
    @Req() req,
  ): Promise<Blog> {
    return this.blogService.create(blog, req.user);
  }

  @Get(':id')
  async getBlog(
    @Param('id')
    id: string,
  ): Promise<Blog> {
    return this.blogService.findById(id);
  }

  @Put(':id')
  async updateBlog(
    @Param('id')
    id: string,
    @Body()
    blog: UpdateBlogDto,
  ): Promise<Blog> {
    return this.blogService.updateById(id, blog);
  }

  @Delete(':id')
  async deleteBlog(
    @Param('id')
    id: string,
  ): Promise<{ deleted: boolean }> {
    return this.blogService.deleteById(id);
  }
}
