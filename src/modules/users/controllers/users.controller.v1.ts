import { Controller, UseFilters, Post, Body } from '@nestjs/common'
import { User } from '../services/interfaces/user.interface'
import { UsersService } from '../services/users.service'
import { UserDTO } from './dtos/user.dto'

@Controller({
    version: '1',
    path: 'users',
})
@UseFilters()
export class UsersControllerV1 {
    constructor(private readonly _usersService: UsersService) {}

    @Post('register')
    async register(@Body() body: UserDTO): Promise<Omit<User, 'password'>> {
        return await this._usersService.create(body)
    }
}
