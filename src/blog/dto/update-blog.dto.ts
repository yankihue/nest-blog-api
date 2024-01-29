import { IsEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  readonly title: string;
  @IsOptional()
  @IsString()
  readonly content: string;

  @IsEmpty({ message: 'You cannot pass user manually.' })
  readonly author: User;
}
