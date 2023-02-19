import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }
  @Post()
  async create(@Body() articleDto: ArticleDto) {
    return this.articleService.createArticle(articleDto)
  }
}