import { User } from '../../services/interfaces/user.interface'

export const userMappedMock: Omit<User, 'password'> = {
    id: 1,
    login: 'Login123',
    email: 'email@email.com',
}
