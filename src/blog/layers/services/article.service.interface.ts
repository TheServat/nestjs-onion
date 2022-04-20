import { IArticle } from '../entities/article/article.interface';

export interface IArticleService {
  create(title: string, body: string): Promise<IArticle>;
  update(id: number, title?: string, body?: string): Promise<boolean>;
  get(id: number): Promise<IArticle>;
  getList(
    skip: number,
    limit: number,
  ): Promise<{ result: IArticle[]; total: number }>;
  delete(id: number): Promise<boolean>;
}
