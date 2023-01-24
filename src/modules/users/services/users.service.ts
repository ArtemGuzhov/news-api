import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { ErrorsEnum } from '../../../shared/enums/errors.enum'
import { EntityManager, Repository } from 'typeorm'
import { UsersEntity } from '../entities/users.entity'
import { User } from './interfaces/user.interface'
import { EmailRegExp } from '../../../shared/regexp/email.regexp'
import { LoginRegExp } from '../../../shared/regexp/login.regexp'
import { PasswordRegExp } from '../../../shared/regexp/password.regexp'
import { createHash } from 'crypto'

@Injectable()
export class UsersService {
    private readonly _usersRepository: Repository<UsersEntity>

    constructor(
        @InjectEntityManager()
        private readonly _entityManager: EntityManager,
    ) {
        this._usersRepository = this._entityManager.getRepository(UsersEntity)
    }

    async findOne(id: number): Promise<UsersEntity> {
        const user = await this._usersRepository.findOne({ where: { id } })

        if (user === null) {
            throw new NotFoundException(ErrorsEnum.USER_NOT_FOUND)
        }

        return user
    }

    async create(payload: Omit<User, 'id'>): Promise<Omit<User, 'password'>> {
        this._checkPayload(payload)

        const isExistEmail = await this._isExistEmail(payload.email)

        if (isExistEmail) {
            throw new BadRequestException(ErrorsEnum.USER_WITH_THIS_EMAIL_ALREADY_EXIST)
        }

        const isExistLogin = await this._isExistLogin(payload.login)

        if (isExistLogin) {
            throw new BadRequestException(ErrorsEnum.USER_WITH_THIS_LOGIN_ALREADY_EXIST)
        }

        const hashPass = await this._hashedPassword(payload.password)

        const newUser = this._usersRepository.create({ ...payload, password: hashPass })
        await this._usersRepository.save(newUser)

        const { id, email, login } = newUser

        return { id, email, login }
    }

    private async _isExistEmail(email: string): Promise<boolean> {
        return !!(await this._usersRepository.findOne({ where: { email } }))
    }

    private async _isExistLogin(login: string): Promise<boolean> {
        return !!(await this._usersRepository.findOne({ where: { login } }))
    }

    private _checkPayload({ email, login, password }: Omit<User, 'id'>): void {
        if (!EmailRegExp.test(email)) {
            throw new BadRequestException(ErrorsEnum.INCORRECT_EMAIL)
        }

        if (!LoginRegExp.test(login)) {
            throw new BadRequestException(ErrorsEnum.INCORRECT_LOGIN)
        }

        if (!PasswordRegExp.test(password)) {
            throw new BadRequestException(ErrorsEnum.NOT_A_STRONG_PASSWORD)
        }
    }

    private async _hashedPassword(password: string): Promise<string> {
        const hash = createHash('sha256').update(password).digest('base64')

        return hash
    }
}
