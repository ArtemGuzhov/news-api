import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { ErrorsEnum } from '../../../shared/enums/errors.enum'
import { EntityManager, Repository } from 'typeorm'
import { NewsEntity } from '../entities/news.entity'
import { News } from './interfaces/news.interface'
import { NewsUpdatePayload } from './interfaces/news-update-payload.interface'
import { UsersService } from '../../users/services/users.service'

@Injectable()
export class NewsService {
    private readonly _newsRepository: Repository<NewsEntity>

    constructor(
        @InjectEntityManager()
        private readonly _entityManager: EntityManager,
        private readonly _usersService: UsersService,
    ) {
        this._newsRepository = this._entityManager.getRepository(NewsEntity)
    }

    async find(): Promise<News[]> {
        const newsList = await this._newsRepository.find({
            withDeleted: false,
            relations: ['user'],
        })

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
        const user = await this._usersService.findOne({ id: userId })
        const newNews = this._newsRepository.create({ ...payload, user })
        await this._newsRepository.save(newNews)

        return this._mappingNews(newNews)
    }

    async update(id: number, payload: NewsUpdatePayload): Promise<News> {
        const news = await this.findOne(id)
        await this._newsRepository.save({ id, ...payload })

        return { id, ...news, publishedAt: news.publishedAt, author: news.author, ...payload }
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
