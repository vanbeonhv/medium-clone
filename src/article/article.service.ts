import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { UserEntity } from 'src/user/user.entity';
import { DataSource, DeleteResult, QueryBuilder, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
        private dataSource: DataSource,
    ) {}

    async createArticle(
        currentUser: UserEntity,
        createArticleDto: CreateArticleDto,
    ) {
        const article = new ArticleEntity();
        Object.assign(article, createArticleDto);
        article.slug = this.generateSlug(article.title);
        //TagList could be empty because it's not mandatory!
        if (!article.tagList) {
            article.tagList = [];
        }
        article.author = currentUser;
        console.log(article);
        return await this.articleRepository.save(article);
    }

    private generateSlug(title: string): string {
        //chua hieu dong nay
        return (
            slugify(title, { lower: true }) +
            '-' +
            ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
        );
    }

    async getArticleBySlug(slug: string): Promise<ArticleEntity> {
        const articleBySlug = await this.articleRepository.findOne({
            // where: { slug: articleSlug }
            where: { slug }, //This is better
        });
        //Dong nay null ke ca trong entity co field author
        // => Thêm eager vào bên entity
        if (!articleBySlug) {
            throw new HttpException('article does exist', HttpStatus.NOT_FOUND);
        }
        return articleBySlug;
    }

    async deleteSingleArticle(
        slug: string,
        currentUserId: number,
    ): Promise<DeleteResult> {
        const articleBySlug = await this.articleRepository.findOne({
            where: { slug },
        });
        if (!articleBySlug) {
            throw new HttpException(
                "Article doesn't exist",
                HttpStatus.NOT_FOUND,
            );
        }

        if (articleBySlug.author.id !== currentUserId) {
            throw new HttpException(
                'You are not the author',
                HttpStatus.FORBIDDEN,
            );
        }
        return await this.articleRepository.delete({ slug });
    }

    async updateArticle(
        slug: string,
        currentUserId: number,
        updateArticleDto: CreateArticleDto,
    ): Promise<ArticleEntity> {
        const articleBySlug = await this.articleRepository.findOne({
            where: { slug },
        });
        if (!articleBySlug) {
            throw new HttpException(
                "Article doesn't exist",
                HttpStatus.NOT_FOUND,
            );
        }
        if (articleBySlug.author.id !== currentUserId) {
            throw new HttpException(
                'You are not the author',
                HttpStatus.FORBIDDEN,
            );
        }
        Object.assign(articleBySlug, updateArticleDto);
        articleBySlug.slug = this.generateSlug(articleBySlug.title);

        return await this.articleRepository.save(articleBySlug);
    }

    async findAll(
        currentUserId: number,
        query: any,
    ): Promise<ArticlesResponseInterface> {
        const queryBuilder = this.dataSource
            .getRepository(ArticleEntity)
            .createQueryBuilder('article') //name of table is article
            .leftJoinAndSelect('articles.author', 'author'); // Chua hieu
        const articles = await queryBuilder.getMany();
        const articlesCount = await queryBuilder.getCount();
        return { articles, articlesCount };
    }

    async buildArticleResponse(
        article: ArticleEntity,
    ): Promise<ArticleResponseInterface> {
        return { article };
    }
}
