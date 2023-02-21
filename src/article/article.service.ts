import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(ArticleEntity)
  private readonly articleRepository: Repository<ArticleEntity>) { }
  async createArticle(createArticleDto: CreateArticleDto) {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);
    article.slug = this.generateSlug(article.title)
    return await this.articleRepository.save(article)
  }
  private generateSlug(title: string): string {
    //chua hieu dong nay
    return slugify(title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
  }
}