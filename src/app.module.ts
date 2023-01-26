import { Module } from '@nestjs/common'
import { typeOrmConfig } from './config/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NewsModule } from './modules/news/news.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from './shared/guards/access-token.guard'

@Module({
    imports: [TypeOrmModule.forRootAsync(typeOrmConfig), NewsModule, UsersModule, AuthModule],
    providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
