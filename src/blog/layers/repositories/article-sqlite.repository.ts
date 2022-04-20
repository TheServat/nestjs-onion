import { BaseRepository } from '../../../base.repository';
import { IArticle } from '../entities/article/article.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entities/article/article';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';

export class ArticleSqliteRepository extends BaseRepository<IArticle> {
  constructor(
    @InjectRepository(ArticleEntity)
    private articlesRepository: Repository<ArticleEntity>,
  ) {
    super();
  }

  get(id: number): Promise<IArticle> {
    return this.articlesRepository.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.articlesRepository.delete({ id });
    return result.affected > 0;
  }

  save(article: Pick<IArticle, 'body' | 'title'>): Promise<IArticle> {
    return this.articlesRepository.save({
      body: article.body,
      title: article.title,
    });
  }

  async update(
    article: Pick<IArticle, 'id' | 'title' | 'body'>,
  ): Promise<boolean> {
    const result = await this.articlesRepository.update(
      { id: article.id },
      {
        ...(article.title ? { title: article.title } : {}),
        ...(article.body ? { body: article.body } : {}),
      },
    );
    return result.affected > 0;
  }

  async getList(
    skip: number,
    limit: number,
  ): Promise<{ result: IArticle[]; total: number }> {
    const [result, total] = await this.articlesRepository.findAndCount({
      take: limit,
      skip,
    });
    return { result: result.map((a) => new Article(a)), total };
  }
}
