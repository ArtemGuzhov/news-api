import { Controller, UseFilters, Get, Post, Body, Delete, Param } from '@nestjs/common'
import { GetUserId } from '../../../shared/decorators/get-user-id.decorator'
import { IsPublic } from '../../../shared/decorators/is-public.decorator'
import { News } from '../services/interfaces/news.interface'
import { NewsService } from '../services/news.service'
import { NewsUpdateDTO } from './dtos/news-update.dto'
import { NewsCreateDTO } from './dtos/news-create.dto'

@Controller({
    version: '1',
    path: 'news',
})
@UseFilters()
export class NewsControllerV1 {
    constructor(private readonly _newsService: NewsService) {}

    @IsPublic()
    @Get()
    async getList(): Promise<News[]> {
        return await this._newsService.find()
    }

    @IsPublic()
    @Get(':id')
    async getNews(@Param() params: { id: number }): Promise<News> {
        const { id } = params

        return await this._newsService.findOne(id)
    }

    @Post('create')
    async create(@GetUserId() userId: number, @Body() body: NewsCreateDTO): Promise<News> {
        return await this._newsService.create(userId, body)
    }

    @Post('update')
    async update(@Body() body: NewsUpdateDTO): Promise<News> {
        const { id, ...data } = body

        return await this._newsService.update(id, data)
    }

    @Delete(':id')
    async delete(@Param() params: { id: number }): Promise<boolean> {
        const { id } = params

        return await this._newsService.delete(id)
    }
}
