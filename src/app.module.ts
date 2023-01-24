import { Module } from '@nestjs/common'
import { typeOrmConfig } from './config/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NewsModule } from './modules/news/news.module'

@Module({
    imports: [TypeOrmModule.forRootAsync(typeOrmConfig), NewsModule],
})
export class AppModule {}
