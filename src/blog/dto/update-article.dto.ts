import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  body: string;
}
