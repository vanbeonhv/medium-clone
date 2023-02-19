import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {TagEntity} from './tag.entity';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRespository: Repository<TagEntity>,
  ) {}
  async findAll(): Promise<TagEntity[]> {
    return await this.tagRespository.find();
  }
}
