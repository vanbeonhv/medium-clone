import { Injectable } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

@Injectable()
export class CreateArticleDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  body: string

  @IsNotEmpty()
  tagList: string

  @IsNotEmpty()
  authorId: number
}