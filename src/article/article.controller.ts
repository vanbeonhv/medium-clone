import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { UserEntity } from 'src/user/user.entity';
import { DeleteResult } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponse.interface';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }
  @Post()
  @UseGuards(AuthGuard)
  async create(
    //Chua hieu lam cach nao @User co the lay duoc thong tin cua user
    //Solved: => Phai truyen token trong header
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto
  ): Promise<ArticleResponseInterface> {
    console.log(currentUser)
    const article = await this.articleService.createArticle(currentUser, createArticleDto);
    return await this.articleService.buildArticleResponse(article);
  }

  @Get(':slug')
  async getSingleArticle(
    @Param("slug") slug: string): Promise<ArticleResponseInterface> {
    const article = await this.articleService.getArticleBySlug(slug)
    return await this.articleService.buildArticleResponse(article)
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteSingleArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string
  ): Promise<any> {
    return await this.articleService.deleteSingleArticle(slug, currentUserId)

  }
}