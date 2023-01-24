import { NewsService } from '../services/news.service'
import { Test, TestingModule } from '@nestjs/testing'
import { EntityManager } from 'typeorm'
import { newsEntityMock } from './mocks/news-entity.mock'
import { createMock } from '@golevelup/ts-jest'
import { newsMappedMock } from './mocks/news-mapped.mock'
import { updatedNewsMappedMock } from './mocks/updated-news-mapped'
import { NotFoundException } from '@nestjs/common'
import { userEntityMock } from '../../users/specs/mocks/user-entity.mock'

describe('NewsService', () => {
    let service: NewsService

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [NewsService, { provide: EntityManager, useValue: createMock<EntityManager>() }],
        }).compile()

        service = moduleRef.get<NewsService>(NewsService)
    })

    it('should be defined NewsService', () => {
        return expect(service).toBeDefined()
    })

    describe('find', () => {
        it('should return news list', async () => {
            jest.spyOn(service['_newsRepository'], 'find').mockResolvedValue([newsEntityMock])

            const newsList = await service.find()

            expect(service['_newsRepository'].find).toHaveBeenCalledTimes(1)
            expect(newsList).toEqual([newsMappedMock])
        })

        it('should return empty list', async () => {
            jest.spyOn(service['_newsRepository'], 'find').mockResolvedValue([])

            const newsList = await service.find()

            expect(service['_newsRepository'].find).toHaveBeenCalledTimes(1)
            expect(newsList).toEqual([])
        })
    })

    describe('findOne', () => {
        it('should return news', async () => {
            const { id } = newsEntityMock

            jest.spyOn(service['_newsRepository'], 'findOne').mockResolvedValue(newsEntityMock)

            const news = await service.findOne(id)

            expect(service['_newsRepository'].findOne).toHaveBeenCalledTimes(1)
            expect(news).toEqual(newsMappedMock)
        })

        it('throw NEWS_NOT_FOUND error', async () => {
            const { id } = newsEntityMock

            jest.spyOn(service['_newsRepository'], 'findOne').mockResolvedValue(null)

            expect(service.findOne(id)).rejects.toThrow('NEWS_NOT_FOUND')
            expect(service['_newsRepository'].findOne).toHaveBeenCalledTimes(1)
        })
    })

    describe('create', () => {
        it('should return created news', async () => {
            const userId = userEntityMock.id

            jest.spyOn(service['_newsRepository'], 'create').mockReturnValue(newsEntityMock)
            jest.spyOn(service['_newsRepository'], 'save').getMockImplementation()

            const { title, description, content } = newsMappedMock

            const news = await service.create(userId, { title, description, content })

            expect(service['_newsRepository'].create).toHaveBeenCalledTimes(1)
            expect(service['_newsRepository'].save).toHaveBeenCalledTimes(1)
            expect(news).toEqual(newsMappedMock)
        })
    })

    describe('update', () => {
        it('should return updated news', async () => {
            const { id } = newsMappedMock

            jest.spyOn(service, 'findOne').mockResolvedValue(newsMappedMock)
            jest.spyOn(service['_newsRepository'], 'save').getMockImplementation()

            const { title, description, content } = updatedNewsMappedMock

            const news = await service.update(id, { title, description, content })

            expect(service.findOne).toHaveBeenCalledTimes(1)
            expect(service['_newsRepository'].save).toHaveBeenCalledTimes(1)
            expect(news).toEqual(updatedNewsMappedMock)
        })

        it('throw NEWS_NOT_FOUND error', async () => {
            const { id } = newsMappedMock

            jest.spyOn(service, 'findOne').mockImplementation(() => {
                throw new NotFoundException('NEWS_NOT_FOUND')
            })

            const { title, description, content } = updatedNewsMappedMock

            expect(service.update(id, { title, description, content })).rejects.toThrow('NEWS_NOT_FOUND')
            expect(service.findOne).toHaveBeenCalledTimes(1)
            expect(service['_newsRepository'].save).toHaveBeenCalledTimes(0)
        })
    })

    describe('delete', () => {
        it('should deleted news', async () => {
            const { id } = newsMappedMock

            jest.spyOn(service, 'findOne').mockResolvedValue(newsMappedMock)
            jest.spyOn(service['_newsRepository'], 'delete').getMockImplementation()

            const news = await service.delete(id)

            expect(service.findOne).toHaveBeenCalledTimes(1)
            expect(service['_newsRepository'].softDelete).toHaveBeenCalledTimes(1)
            expect(news).toEqual(true)
        })

        it('throw NEWS_NOT_FOUND error', async () => {
            const { id } = newsMappedMock

            jest.spyOn(service, 'findOne').mockImplementation(() => {
                throw new NotFoundException('NEWS_NOT_FOUND')
            })

            expect(service.delete(id)).rejects.toThrow('NEWS_NOT_FOUND')
            expect(service.findOne).toHaveBeenCalledTimes(1)
            expect(service['_newsRepository'].softDelete).toHaveBeenCalledTimes(0)
        })
    })
})
