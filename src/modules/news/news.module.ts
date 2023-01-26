import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { NewsControllerV1 } from './controllers/news.controller.v1'
import { NewsService } from './services/news.service'

@Module({
    imports: [UsersModule],
    controllers: [NewsControllerV1],
    providers: [NewsService],
})
export class NewsModule {}
