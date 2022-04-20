import { IArticle } from '../entities/article/article.interface';
import { IArticleService } from './article.service.interface';
import { BaseRepository } from '../../../base.repository';
import { Inject } from '@nestjs/common';

export class ArticleService implements IArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY_TOKEN')
    protected readonly repository: BaseRepository<IArticle>,
  ) {}

  create(title: string, body: string): Promise<IArticle> {
    return this.repository.save({ title, body });
  }

  update(id: number, title?: string, body?: string): Promise<boolean> {
    return this.repository.update({ id, body, title });
  }

  get(id: number): Promise<IArticle> {
    return this.repository.get(id);
  }

  getList(
    skip: number,
    limit: number,
  ): Promise<{ result: IArticle[]; total: number }> {
    return this.repository.getList(skip, limit);
  }

  async delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
