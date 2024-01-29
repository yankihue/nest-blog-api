import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsEmpty({ message: 'You cannot pass user manually.' })
  readonly author: User;
}
