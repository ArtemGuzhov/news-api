import { NewsService } from '../services/news.service'
import { Test, TestingModule } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { newsMappedMock } from './mocks/news-mapped.mock'
import { updatedNewsMappedMock } from './mocks/updated-news-mapped'
import { NotFoundException } from '@nestjs/common'
import { NewsControllerV1 } from '../controllers/news.controller.v1'

describe('NewsControllerV1', () => {
    let controller: NewsControllerV1
    let service: NewsService

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [NewsControllerV1, { provide: NewsService, useValue: createMock<NewsService>() }],
        }).compile()

        controller = moduleRef.get<NewsControllerV1>(NewsControllerV1)
        service = moduleRef.get<NewsService>(NewsService)
    })

    it('should be defined NewsControllerV1', () => {
        return expect(controller).toBeDefined()
    })

    it('should be defined NewsService', () => {
        return expect(service).toBeDefined()
    })

    describe('getList', () => {
        it('should return news list', async () => {
            jest.spyOn(service, 'find').mockResolvedValue([newsMappedMock])

            const newsList = await controller.getList()

            expect(service.find).toHaveBeenCalledTimes(1)
            expect(newsList).toEqual([newsMappedMock])
        })

        it('should return empty list', async () => {
            jest.spyOn(service, 'find').mockResolvedValue([])

            const newsList = await controller.getList()

            expect(service.find).toHaveBeenCalledTimes(1)
            expect(newsList).toEqual([])
        })
    })

    describe('getNews', () => {
        it('should return news', async () => {
            const { id } = newsMappedMock

            jest.spyOn(service, 'findOne').mockResolvedValue(newsMappedMock)

            const news = await controller.getNews({ id })

            expect(service.findOne).toHaveBeenCalledTimes(1)
            expect(news).toEqual(newsMappedMock)
        })

        it('throw NotFoundException error', async () => {
            const { id } = newsMappedMock

            jest.spyOn(service, 'findOne').mockImplementation(() => {
                throw new NotFoundException('NEWS_NOT_FOUND')
            })

            expect(controller.getNews({ id })).rejects.toThrow('NEWS_NOT_FOUND')
            expect(service.findOne).toHaveBeenCalledTimes(1)
        })
    })

    describe('create', () => {
        it('should create news', async () => {
            jest.spyOn(service, 'create').mockResolvedValue(newsMappedMock)

            const { title, description, content } = newsMappedMock

            const news = await service.create({ title, description, content })

            expect(service.create).toHaveBeenCalledTimes(1)
            expect(news).toEqual(newsMappedMock)
        })
    })

    describe('update', () => {
        it('should update news', async () => {
            const { id } = newsMappedMock

            jest.spyOn(service, 'update').mockResolvedValue(updatedNewsMappedMock)

            const { title, description, content } = updatedNewsMappedMock

            const news = await controller.update({ id, title, description, content })

            expect(service.update).toHaveBeenCalledTimes(1)
            expect(news).toEqual(updatedNewsMappedMock)
        })

        it('throw NotFoundException error', async () => {
            const { id } = newsMappedMock

            jest.spyOn(service, 'update').mockImplementation(() => {
                throw new NotFoundException('NEWS_NOT_FOUND')
            })

            const { title, description, content } = updatedNewsMappedMock

            expect(controller.update({ id, title, description, content })).rejects.toThrow('NEWS_NOT_FOUND')
            expect(service.update).toHaveBeenCalledTimes(1)
        })
    })

    describe('delete', () => {
        it('should delete news', async () => {
            const { id } = newsMappedMock

            jest.spyOn(service, 'delete').mockResolvedValue(true)

            const news = await controller.delete({ id })

            expect(service.delete).toHaveBeenCalledTimes(1)
            expect(news).toEqual(true)
        })

        it('throw NotFoundException error', async () => {
            const { id } = newsMappedMock

            jest.spyOn(service, 'delete').mockImplementation(() => {
                throw new NotFoundException('NEWS_NOT_FOUND')
            })

            expect(controller.delete({ id })).rejects.toThrow('NEWS_NOT_FOUND')
            expect(service.delete).toHaveBeenCalledTimes(1)
        })
    })
})
