import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { IArticleService } from '../services/article.service.interface';
import { Article } from '../entities/article/article';
import { CreateArticleDto } from '../../dto/create-article.dto';
import { UpdateArticleDto } from '../../dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(
    @Inject('ARTICLE_SERVICE_TOKEN')
    protected service: IArticleService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getArticle(@Param() id: number): Promise<Article> {
    return this.service.get(id);
  }

  @Put()
  createArticle(@Body() article: CreateArticleDto) {
    return this.service.create(article.title, article.body);
  }

  @Post()
  updateArticle(@Body() article: UpdateArticleDto) {
    return this.service.update(article.id, article.title, article.body);
  }

  @Delete(':id')
  deleteArticle(@Param() id: number) {
    return this.deleteArticle(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list/:skip/:limit')
  getListOfArticles(
    @Param('skip') skip: number,
    @Param('limit') limit: number,
  ) {
    return this.service.getList(skip ?? 0, limit ?? 1);
  }
}
