import { Body, Controller, Post } from '@nestjs/common';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleReponseInterface } from './types/articleResponse.interface';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }
  @Post()
  async create(@Body('article') createArticleDto: ArticleReponseInterface): Promise<ArticleReponseInterface> {
    const article = await this.articleService.createArticle(createArticleDto);
    return article as any
  }
}