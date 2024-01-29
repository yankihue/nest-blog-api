import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { Blog } from '../schemas/blog.schema';

export class CreateCommentDTO {
  @IsNotEmpty()
  @IsString()
  readonly content: string;
  @IsEmpty({ message: 'You cannot pass user manually.' })
  readonly author: User;
  @IsEmpty({ message: 'You cannot pass parent post manually.' })
  readonly parent: Blog;
}
