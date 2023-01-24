import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { ErrorsEnum } from '../../../shared/enums/errors.enum'
import { EntityManager, Repository } from 'typeorm'
import { NewsEntity } from '../entities/news.entity'
import { News } from './interfaces/news.interface'

@Injectable()
export class NewsService {
    private readonly _newsRepository: Repository<NewsEntity>

    constructor(
        @InjectEntityManager()
        private readonly _entityManager: EntityManager,
    ) {
        this._newsRepository = this._entityManager.getRepository(NewsEntity)
    }

    async find(): Promise<News[]> {
        const newsList = await this._newsRepository.find({ withDeleted: false })

        return newsList.map(news => this._mappingNews(news))
    }

    async findOne(id: number): Promise<News> {
        const news = await this._newsRepository.findOne({ where: { id } })

        if (news === null) {
            throw new NotFoundException(ErrorsEnum.NEWS_NOT_FOUND)
        }

        return this._mappingNews(news)
    }

    async create(userId: number, payload: Omit<News, 'id' | 'publishedAt' | 'author'>): Promise<News> {
        const newNews = this._newsRepository.create({ ...payload, user: { id: userId } })
        await this._newsRepository.save(newNews)

        return this._mappingNews(newNews)
    }

    async update(id: number, payload: Omit<News, 'id' | 'publishedAt' | 'author'>): Promise<News> {
        const news = await this.findOne(id)
        await this._newsRepository.save({ id, ...payload })

        return { id, ...payload, publishedAt: news.publishedAt, author: news.author }
    }

    async delete(id: number): Promise<boolean> {
        await this.findOne(id)
        await this._newsRepository.softDelete({ id })

        return true
    }

    private _mappingNews(news: NewsEntity): News {
        const {
            id,
            title,
            description,
            content,
            createdAt: publishedAt,
            user: { login },
        } = news

        return {
            id,
            title,
            description,
            content,
            author: login,
            publishedAt,
        }
    }
}
