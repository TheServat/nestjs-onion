import { Transform } from 'class-transformer';
import { IArticle } from './article.interface';
export class Article implements IArticle {
  id: number;
  body: string;
  @Transform(({ value }) => (value as Date).toISOString())
  createdAt: Date;
  @Transform(({ value }) => (value as Date).toISOString())
  updatedAt: Date;
  title: string;
  constructor(partial: Partial<Article>) {
    Object.assign(this, partial);
  }
}
