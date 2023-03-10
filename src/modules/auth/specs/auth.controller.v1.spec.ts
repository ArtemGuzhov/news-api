import { Test, TestingModule } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { AuthControllerV1 } from '../controllers/auth.controller.v1'
import { AuthService } from '../services/auth.service'
import { tokensMock } from './mocks/tokens.mock'
import { userPayloadMock } from '../../users/specs/mocks/user-payload.mock'
import { userEntityMock } from '../../users/specs/mocks/user-entity.mock'
import { JwtTokensService } from '../services/jwt-tokens.service'

describe('AuthControllerV1', () => {
    let controller: AuthControllerV1
    let authService: AuthService
    let jwtTokensService: JwtTokensService

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                AuthControllerV1,
                { provide: AuthService, useValue: createMock<AuthService>() },
                { provide: JwtTokensService, useValue: createMock<JwtTokensService>() },
            ],
        }).compile()

        controller = moduleRef.get<AuthControllerV1>(AuthControllerV1)
        authService = moduleRef.get<AuthService>(AuthService)
        jwtTokensService = moduleRef.get<JwtTokensService>(JwtTokensService)
    })

    it('should be defined AuthControllerV1', () => {
        return expect(controller).toBeDefined()
    })

    describe('auth', () => {
        it('should return tokens', async () => {
            const { email, password } = userPayloadMock

            jest.spyOn(authService, 'auth').mockResolvedValue(tokensMock)

            const tokens = await controller.auth({ email, password })

            expect(authService.auth).toHaveBeenCalledTimes(1)
            expect(tokens).toEqual(tokensMock)
        })
    })

    describe('logout', () => {
        it('should logout user', async () => {
            const { id } = userEntityMock

            jest.spyOn(authService, 'logout').mockResolvedValue(true)

            const isLogouted = await controller.logout({ id })

            expect(authService.logout).toHaveBeenCalledTimes(1)
            expect(isLogouted).toEqual(true)
        })
    })

    describe('refreshTokens', () => {
        it('should refresh token', async () => {
            const { id } = userEntityMock
            const refreshToken = 'refreshToken'

            jest.spyOn(jwtTokensService, 'refreshTokens').mockResolvedValue(tokensMock)

            const tokens = await controller.refreshTokens(id, refreshToken)

            expect(jwtTokensService.refreshTokens).toHaveBeenCalledTimes(1)
            expect(tokens).toEqual(tokensMock)
        })
    })
})
