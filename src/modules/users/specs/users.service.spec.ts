import { Test, TestingModule } from '@nestjs/testing'
import { EntityManager } from 'typeorm'
import { createMock } from '@golevelup/ts-jest'
import { UsersService } from '../services/users.service'
import { userEntityMock } from './mocks/user-entity.mock'
import { userMappedMock } from './mocks/user-mapped.mock'
import { userPayloadMock } from './mocks/user-payload.mock'

describe('UsersService', () => {
    let service: UsersService

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [UsersService, { provide: EntityManager, useValue: createMock<EntityManager>() }],
        }).compile()

        service = moduleRef.get<UsersService>(UsersService)
    })

    it('should be defined UsersService', () => {
        return expect(service).toBeDefined()
    })

    describe('findOne', () => {
        it('should return user', async () => {
            const userId = userEntityMock.id

            jest.spyOn(service['_usersRepository'], 'findOne').mockResolvedValue(userEntityMock)

            const user = await service.findOne({ id: userId })

            expect(service['_usersRepository'].findOne).toHaveBeenCalledTimes(1)
            expect(user).toEqual(userEntityMock)
        })

        it('throw USER_NOT_FOUND error', async () => {
            const userId = userEntityMock.id

            jest.spyOn(service['_usersRepository'], 'findOne').mockResolvedValue(null)

            expect(service.findOne({ id: userId })).rejects.toThrow('USER_NOT_FOUND')
            expect(service['_usersRepository'].findOne).toHaveBeenCalledTimes(1)
        })
    })

    describe('create', () => {
        it('throw NOT_A_STRONG_PASSWORD error', async () => {
            expect(service.create({ ...userPayloadMock, password: '' })).rejects.toThrow('NOT_A_STRONG_PASSWORD')
        })

        it('throw INCORRECT_LOGIN error', async () => {
            expect(service.create({ ...userPayloadMock, login: '' })).rejects.toThrow('INCORRECT_LOGIN')
        })

        it('throw INCORRECT_EMAIL error', async () => {
            expect(service.create({ ...userPayloadMock, email: 'email' })).rejects.toThrow('INCORRECT_EMAIL')
        })

        it('throw USER_WITH_THIS_EMAIL_ALREADY_EXIST error', async () => {
            jest.spyOn(service as any, '_isExistEmail').mockResolvedValue(true)

            expect(service.create(userPayloadMock)).rejects.toThrow('USER_WITH_THIS_EMAIL_ALREADY_EXIST')
        })

        it('throw USER_WITH_THIS_EMAIL_ALREADY_EXIST error', async () => {
            jest.spyOn(service as any, '_isExistEmail').mockResolvedValue(false)
            jest.spyOn(service as any, '_isExistLogin').mockResolvedValue(true)

            expect(service.create(userPayloadMock)).rejects.toThrow('USER_WITH_THIS_LOGIN_ALREADY_EXIST')
        })

        it('should return created user', async () => {
            jest.spyOn(service as any, '_isExistEmail').mockResolvedValue(false)
            jest.spyOn(service as any, '_isExistLogin').mockResolvedValue(false)

            jest.spyOn(service['_usersRepository'], 'create').mockReturnValue(userEntityMock)
            jest.spyOn(service['_usersRepository'], 'save').mockImplementation()

            const user = await service.create(userPayloadMock)

            expect(user).toEqual(userMappedMock)
            expect(service['_isExistEmail']).toHaveBeenCalledTimes(1)
            expect(service['_isExistLogin']).toHaveBeenCalledTimes(1)
            expect(service['_usersRepository'].create).toHaveBeenCalledTimes(1)
            expect(service['_usersRepository'].save).toHaveBeenCalledTimes(1)
        })
    })
})
