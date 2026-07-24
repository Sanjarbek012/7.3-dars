import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {
  constructor(@InjectRepository(Article) private articleRepo: Repository<Article>) {}

  async create(createArticleDto: CreateArticleDto, file: Express.Multer.File): Promise<Article> {
    const article = this.articleRepo.create(createArticleDto)

    article.backgroundImage = `http://localhost:4001/uploads/${file.filename}`
    return await this.articleRepo.save(article)
  }

  async findAll(): Promise<Article[]> {
    return await this.articleRepo.find()
  }

  async findOne(id: number): Promise <Article> {
    const foundedArticle = await this.articleRepo.findOne({where: {id}})

    if(!foundedArticle) throw new NotFoundException("Article not found")
    return foundedArticle
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<string> {
     const foundedArticle = await this.articleRepo.findOne({where: {id}})

    if(!foundedArticle) throw new NotFoundException("Article not found")
      await this.articleRepo.update(id, updateArticleDto)
      return "Updated article"
  }

  async remove(id: number): Promise<string> {
    const foundedArticle = await this.articleRepo.findOne({where: {id}})

    if(!foundedArticle) throw new NotFoundException("Article not found")
    await this.articleRepo.remove(foundedArticle)
    return "Deleted article" 
  }
}