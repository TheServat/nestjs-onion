import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './layers/controllers/article.controller';
import { ArticleService } from './layers/services/article.service';
import { ArticleSqliteRepository } from './layers/repositories/article-sqlite.repository';
import { Article } from './layers/entities/article/article';
import { ArticleEntity } from './layers/repositories/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [
    {
      provide: 'ARTICLE_SERVICE_TOKEN',
      useClass: ArticleService,
    },
    {
      provide: 'ARTICLE_REPOSITORY_TOKEN',
      useClass: ArticleSqliteRepository,
    },
    {
      provide: 'ARTICLE_TOKEN',
      useClass: Article,
    },
  ],
})
export class BlogModule {}
