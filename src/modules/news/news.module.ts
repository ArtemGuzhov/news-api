import { Module } from '@nestjs/common'
import { NewsControllerV1 } from './controllers/news.controller.v1'
import { NewsService } from './services/news.service'

@Module({
    controllers: [NewsControllerV1],
    providers: [NewsService],
})
export class NewsModule {}
