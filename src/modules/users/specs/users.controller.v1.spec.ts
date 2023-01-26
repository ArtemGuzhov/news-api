import { Test, TestingModule } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { UsersControllerV1 } from '../controllers/users.controller.v1'
import { UsersService } from '../services/users.service'
import { userPayloadMock } from './mocks/user-payload.mock'
import { userMappedMock } from './mocks/user-mapped.mock'

describe('UsersControllerV1', () => {
    let controller: UsersControllerV1
    let service: UsersService

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [UsersControllerV1, { provide: UsersService, useValue: createMock<UsersService>() }],
        }).compile()

        controller = moduleRef.get<UsersControllerV1>(UsersControllerV1)
        service = moduleRef.get<UsersService>(UsersService)
    })

    it('should be defined NewsControllerV1', () => {
        return expect(controller).toBeDefined()
    })

    describe('register', () => {
        it('should return registered user', async () => {
            jest.spyOn(service, 'create').mockResolvedValue(userMappedMock)

            const user = await controller.register(userPayloadMock)

            expect(user).toEqual(userMappedMock)
        })
    })
})
