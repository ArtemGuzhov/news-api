import { Body, Controller, Get, Param, Post, UseFilters, UseGuards } from '@nestjs/common'
import { GetRefreshToken } from '../../../shared/decorators/get-refresh-token.decorator'
import { GetUserId } from '../../../shared/decorators/get-user-id.decorator'
import { IsPublic } from '../../../shared/decorators/is-public.decorator'
import { RefreshTokenGuard } from '../../../shared/guards/refresh-token.guard'
import { AuthService } from '../services/auth.service'
import { Tokens } from '../services/interfaces/tokens.interface'
import { JwtTokensService } from '../services/jwt-tokens.service'
import { AuthDTO } from './dtos/auth.dto'

@Controller({
    version: '1',
    path: 'auth',
})
@UseFilters()
export class AuthControllerV1 {
    constructor(private readonly _authService: AuthService, private readonly _jwtTokensService: JwtTokensService) {}

    @Get('logout/:id')
    async logout(@Param() params: { id: number }): Promise<boolean> {
        const { id } = params

        return await this._authService.logout(id)
    }

    @IsPublic()
    @Post()
    async auth(@Body() body: AuthDTO): Promise<Tokens> {
        const { email, password } = body

        return await this._authService.auth(email, password)
    }

    @IsPublic()
    @UseGuards(RefreshTokenGuard)
    @Post('refresh-token')
    refreshTokens(@GetUserId() id: number, @GetRefreshToken('refreshToken') refreshToken: string): Promise<Tokens> {
        return this._jwtTokensService.refreshTokens(id, refreshToken)
    }
}
