import { Injectable, ForbiddenException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { environment } from '../../../environment'
import { ErrorsEnum } from '../../../shared/enums/errors.enum'
import { compareHashes } from '../../../shared/helpers/compare-hashes.helper'
import { getHash } from '../../../shared/helpers/get-hash.helper'
import { UsersEntity } from '../../users/entities/users.entity'
import { UsersService } from '../../users/services/users.service'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { Tokens } from './interfaces/tokens.interface'

@Injectable()
export class JwtTokensService {
    constructor(private readonly _usersService: UsersService, private readonly _jwtService: JwtService) {}

    async refreshTokens(id: number, refreshToken: string): Promise<Tokens> {
        let user: UsersEntity

        try {
            user = await this._usersService.findOne({ id })
        } catch {
            throw new ForbiddenException(ErrorsEnum.ACCESS_DENIED)
        }

        if (!user.refreshToken) throw new ForbiddenException(ErrorsEnum.ACCESS_DENIED)

        const isMatch = await compareHashes(refreshToken, user.refreshToken)

        if (!isMatch) throw new ForbiddenException(ErrorsEnum.ACCESS_DENIED)

        const tokens = await this.getTokens(user.id)
        await this.updateRefreshTokenHash(id, tokens.refreshToken)

        return tokens
    }

    async updateRefreshTokenHash(id: number, refreshToken: string): Promise<void> {
        const newRefreshToken = await getHash(refreshToken)

        await this._usersService.update(id, { refreshToken: newRefreshToken })
    }

    async getTokens(id: number): Promise<Tokens> {
        const jwtPayload: Pick<JwtPayload, 'id'> = {
            id,
        }

        const {
            tokenKeys: { accessKey, refreshKey },
        } = environment

        const [accessToken, refreshToken]: string[] = await Promise.all([
            this._jwtService.signAsync(jwtPayload, {
                secret: accessKey,
                expiresIn: '1d',
            }),
            this._jwtService.signAsync(jwtPayload, {
                secret: refreshKey,
                expiresIn: '3d',
            }),
        ])

        return {
            accessToken,
            refreshToken,
        }
    }
}
