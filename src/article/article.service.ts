import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  async createArticle(articleDto: any) {
    return 'created in service' as any
  }
}