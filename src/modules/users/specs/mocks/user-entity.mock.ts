import { dateMock } from '../../../../shared/mocks/date.mock'
import { UsersEntity } from '../../entities/users.entity'

export const userEntityMock: UsersEntity = {
    id: 1,
    login: 'Login123',
    email: 'email@email.com',
    password: 'WYgQjeal8EMoTDazqReciPRnKgvIQO+O77Gww3ruKPU=',
    refreshToken: '4erp43O6YqgM29RCL8ACVTRHrrOP242/URpS0+jF5Bc=',
    createdAt: dateMock,
    updatedAt: dateMock,
    deletedAt: null,
    news: null,
}
