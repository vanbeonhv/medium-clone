import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponse.interface';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }
  @Post()
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto
  ): Promise<ArticleResponseInterface> {
    console.log(currentUser)
    const article = await this.articleService.createArticle(currentUser, createArticleDto);
    return await this.articleService.buildArticleResponse(article);
  }

  @Get(':slug')
  async getArticle(
    @User() currentUser: UserEntity,
    @Param("slug") slug: string): Promise<any> {
    const article = await this.articleService.getArticle(slug)
    return await this.articleService.buildArticleResponse(article)
  }
}