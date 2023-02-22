import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { UserEntity } from 'src/user/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponse.interface';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(ArticleEntity)
  private readonly articleRepository: Repository<ArticleEntity>) { }

  async createArticle(currentUser: UserEntity, createArticleDto: CreateArticleDto) {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);
    article.slug = this.generateSlug(article.title)
    //TagList could be empty because it's not mandatory!
    if (!article.tagList) {
      article.tagList = []
    }
    article.author = currentUser;
    console.log(article)
    return await this.articleRepository.save(article)
  }

  private generateSlug(title: string): string {
    //chua hieu dong nay
    return slugify(title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
  }

  async getArticleBySlug(slug: string): Promise<ArticleEntity> {
    const articleBySlug = await this.articleRepository.findOne({
      // where: { slug: articleSlug }
      where: { slug } //This is better
    })
    //Dong nay null ke ca trong entity co field author
    console.log(articleBySlug)
    return articleBySlug
  }

  async deleteSingleArticle(slug: string, currentUserId: number): Promise<DeleteResult> {
    const articleBySlug = await this.articleRepository.findOne({
      where: { slug }
    })
    if (!articleBySlug) {
      throw new HttpException('Article does exist', HttpStatus.NOT_FOUND)
    }

    if (articleBySlug.author.id !== currentUserId) {
      console.log('articleBySlug.author.id ', articleBySlug.author.id)
      console.log('currentUserId ', currentUserId)
      throw new HttpException('You are not the author', HttpStatus.FORBIDDEN)
    }
    return await this.articleRepository.delete({ slug })
  }

  async buildArticleResponse(article: ArticleEntity): Promise<ArticleResponseInterface> {
    return { article }
  }
}