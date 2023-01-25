import { BadRequestException, Injectable } from '@nestjs/common'
import { ErrorsEnum } from '../../../shared/enums/errors.enum'
import { compareHashes } from '../../../shared/helpers/compare-hashes.helper'
import { UsersService } from '../../users/services/users.service'
import { Tokens } from './interfaces/tokens.interface'
import { JwtTokensService } from './jwt-tokens.service'

@Injectable()
export class AuthService {
    constructor(private readonly _usersService: UsersService, private readonly _jwtTokensService: JwtTokensService) {}

    async auth(email: string, password: string): Promise<Tokens> {
        const user = await this._usersService.findOne({ email })

        const isMatch = await compareHashes(password, user.password)

        if (!isMatch) throw new BadRequestException(ErrorsEnum.INCORRECT_EMAIL_OR_PASSWORD)

        const tokens = await this._jwtTokensService.getTokens(user.id)
        await this._jwtTokensService.updateRefreshTokenHash(user.id, tokens.refreshToken)

        return tokens
    }

    async logout(id: number): Promise<boolean> {
        await this._usersService.update(id, { refreshToken: null })

        return true
    }
}
