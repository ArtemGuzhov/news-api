import { Test, TestingModule } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { AuthService } from '../services/auth.service'
import { UsersService } from '../../users/services/users.service'
import { JwtTokensService } from '../services/jwt-tokens.service'
import { userPayloadMock } from '../../users/specs/mocks/user-payload.mock'
import { userEntityMock } from '../../users/specs/mocks/user-entity.mock'
import { tokensMock } from './mocks/tokens.mock'

describe('AuthService', () => {
    let service: AuthService

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UsersService, useValue: createMock<UsersService>() },
                { provide: JwtTokensService, useValue: createMock<JwtTokensService>() },
            ],
        }).compile()

        service = moduleRef.get<AuthService>(AuthService)
    })

    it('should be defined AuthService', () => {
        return expect(service).toBeDefined()
    })

    describe('auth', () => {
        it('should log in and return tokens', async () => {
            const { email, password } = userPayloadMock

            jest.spyOn(service['_usersService'], 'findOne').mockResolvedValue(userEntityMock)
            jest.spyOn(service['_jwtTokensService'], 'getTokens').mockResolvedValue(tokensMock)
            jest.spyOn(service['_jwtTokensService'], 'updateRefreshTokenHash').mockImplementation()

            const tokens = await service.auth(email, password)

            expect(service['_usersService'].findOne).toHaveBeenCalledTimes(1)
            expect(service['_jwtTokensService'].getTokens).toHaveBeenCalledTimes(1)
            expect(service['_jwtTokensService'].updateRefreshTokenHash).toHaveBeenCalledTimes(1)
            expect(tokens).toEqual(tokensMock)
        })

        it('throw USER_NOT_FOUND error if empty paylaod', async () => {
            const { email, password } = userPayloadMock

            jest.spyOn(service['_usersService'], 'findOne').mockResolvedValue(userEntityMock)

            expect(service.auth(email, password + '!')).rejects.toThrow('INCORRECT_EMAIL_OR_PASSWORD')
            expect(service['_usersService'].findOne).toHaveBeenCalledTimes(1)
        })
    })

    describe('logout', () => {
        it('should nullify refresh token', async () => {
            const { id } = userEntityMock

            jest.spyOn(service['_usersService'], 'update').mockImplementation()

            expect(service.logout(id)).resolves.toEqual(true)
        })
    })
})
