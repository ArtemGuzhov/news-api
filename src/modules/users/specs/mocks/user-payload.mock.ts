import { User } from '../../services/interfaces/user.interface'

export const userPayloadMock: Omit<User, 'id'> = {
    login: 'Login123',
    email: 'email@email.com',
    password: 'Pa$$w0rd123',
}
