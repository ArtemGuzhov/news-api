import { Module } from '@nestjs/common'
import { UsersControllerV1 } from './controllers/users.controller.v1'
import { UsersService } from './services/users.service'

@Module({
    controllers: [UsersControllerV1],
    providers: [UsersService],
})
export class UsersModule {}
