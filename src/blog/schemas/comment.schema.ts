import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
import { Blog } from './blog.schema';

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
  @Prop()
  authorName: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' })
  parent: Blog;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
