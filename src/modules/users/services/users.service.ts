import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { ErrorsEnum } from '../../../shared/enums/errors.enum'
import { EntityManager, Repository } from 'typeorm'
import { UsersEntity } from '../entities/users.entity'
import { User } from './interfaces/user.interface'
import { EmailRegExp } from '../../../shared/regexp/email.regexp'
import { LoginRegExp } from '../../../shared/regexp/login.regexp'
import { PasswordRegExp } from '../../../shared/regexp/password.regexp'
import { getHash } from '../../../shared/helpers/get-hash.helper'
import { UserUpdatePayload } from './interfaces/user-update-payload.interface'
import { UserFindOneOptions } from './interfaces/user-find-one-options.interface'

@Injectable()
export class UsersService {
    private readonly _usersRepository: Repository<UsersEntity>

    constructor(
        @InjectEntityManager()
        private readonly _entityManager: EntityManager,
    ) {
        this._usersRepository = this._entityManager.getRepository(UsersEntity)
    }

    async findOne({ id, email, login }: UserFindOneOptions): Promise<UsersEntity> {
        if (id) {
            const user = await this._usersRepository.findOne({ where: { id } })

            if (user !== null) return user
        }

        if (email) {
            const user = await this._usersRepository.findOne({ where: { email } })

            if (user !== null) return user
        }

        if (login) {
            const user = await this._usersRepository.findOne({ where: { login } })

            if (user !== null) return user
        }

        throw new NotFoundException(ErrorsEnum.USER_NOT_FOUND)
    }

    async update(id: number, payload: UserUpdatePayload): Promise<Omit<User, 'password'>> {
        const isExistEmail = payload.email ? await this._isExistEmail(payload.email) : false

        if (isExistEmail) throw new BadRequestException(ErrorsEnum.USER_WITH_THIS_EMAIL_ALREADY_EXIST)

        const isExistLogin = payload.login ? await this._isExistLogin(payload.login) : false

        if (isExistLogin) throw new BadRequestException(ErrorsEnum.USER_WITH_THIS_LOGIN_ALREADY_EXIST)

        if (payload.password) {
            const hashPassword = await getHash(payload.password)
            payload.password = hashPassword
        }

        const user = await this.findOne({ id })
        await this._usersRepository.save({ id, ...user, ...payload })

        return { id: user.id, ...user, ...payload }
    }

    async create(payload: Omit<User, 'id' | 'refreshToken'>): Promise<Omit<User, 'password' | 'refreshToken'>> {
        this._checkPayload(payload)

        const isExistEmail = await this._isExistEmail(payload.email)

        if (isExistEmail) throw new BadRequestException(ErrorsEnum.USER_WITH_THIS_EMAIL_ALREADY_EXIST)

        const isExistLogin = await this._isExistLogin(payload.login)

        if (isExistLogin) throw new BadRequestException(ErrorsEnum.USER_WITH_THIS_LOGIN_ALREADY_EXIST)

        const hashPass = await getHash(payload.password)

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

    private _checkPayload({ email, login, password }: Omit<User, 'id' | 'refreshToken'>): void {
        if (!EmailRegExp.test(email)) throw new BadRequestException(ErrorsEnum.INCORRECT_EMAIL)

        if (!LoginRegExp.test(login)) {
            throw new BadRequestException(ErrorsEnum.INCORRECT_LOGIN, {
                description:
                    'Login must be between 5 and 20 characters long and may contain uppercase, lowercase letters and numbers',
            })
        }

        if (!PasswordRegExp.test(password)) {
            throw new BadRequestException(ErrorsEnum.NOT_A_STRONG_PASSWORD, {
                description:
                    'The password must be at least 8 characters long and contain at least one special character and a number and no spaces',
            })
        }
    }
}
