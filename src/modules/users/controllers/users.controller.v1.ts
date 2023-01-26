import { Controller, UseFilters, Post, Body } from '@nestjs/common'
import { IsPublic } from '../../../shared/decorators/is-public.decorator'
import { User } from '../services/interfaces/user.interface'
import { UsersService } from '../services/users.service'
import { UserRegisterDTO } from './dtos/user-register.dto'

@Controller({
    version: '1',
    path: 'users',
})
@UseFilters()
export class UsersControllerV1 {
    constructor(private readonly _usersService: UsersService) {}

    @IsPublic()
    @Post('register')
    async register(@Body() body: UserRegisterDTO): Promise<Omit<User, 'password' | 'refreshToken'>> {
        const { email, login, password } = body

        return await this._usersService.create({ email, login, password })
    }
}
