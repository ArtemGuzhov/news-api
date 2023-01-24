import { Controller, UseFilters, Get, Post, Body, Delete, Param } from '@nestjs/common'
import { News } from '../services/interfaces/news.interface'
import { NewsService } from '../services/news.service'
import { NewsDTO } from './dtos/news.dto'

@Controller({
    version: '1',
    path: 'news',
})
@UseFilters()
export class NewsControllerV1 {
    constructor(private readonly _newsService: NewsService) {}

    @Get()
    async getList(): Promise<News[]> {
        return await this._newsService.find()
    }

    @Get(':id')
    async getNews(@Param() params: { id: number }): Promise<News> {
        const { id } = params

        return await this._newsService.findOne(id)
    }

    @Post('create')
    async create(@Body() body: NewsDTO): Promise<News> {
        return await this._newsService.create(body)
    }

    @Post('update')
    async update(@Body() body: NewsDTO): Promise<News> {
        const { id, ...data } = body

        return await this._newsService.update(id, data)
    }

    @Delete(':id')
    async delete(@Param() params: { id: number }): Promise<boolean> {
        const { id } = params

        return await this._newsService.delete(id)
    }
}
