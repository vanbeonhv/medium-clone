import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
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
    return await this.articleRepository.save(article)
  }

  private generateSlug(title: string): string {
    //chua hieu dong nay
    return slugify(title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
  }

  async getArticle(articleSlug: string): Promise<ArticleEntity> {
    const articleBySlug = await this.articleRepository.findOne({
      where: { slug: articleSlug }
    })
    return articleBySlug
  }

  async buildArticleResponse(article: ArticleEntity): Promise<ArticleResponseInterface> {
    return { article }
  }
}