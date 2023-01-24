import { Module } from '@nestjs/common'
import { typeOrmConfig } from './config/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NewsModule } from './modules/news/news.module'
import { UsersModule } from 'modules/users/users.module'

@Module({
    imports: [TypeOrmModule.forRootAsync(typeOrmConfig), NewsModule, UsersModule],
})
export class AppModule {}
