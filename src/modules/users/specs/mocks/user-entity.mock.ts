import { dateMock } from '../../../../shared/mocks/date.mock'
import { UsersEntity } from '../../entities/users.entity'

export const userEntityMock: UsersEntity = {
    id: 1,
    login: 'Login123',
    email: 'email@email.com',
    password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=',
    createdAt: dateMock,
    updatedAt: dateMock,
    deletedAt: null,
    news: null,
}
