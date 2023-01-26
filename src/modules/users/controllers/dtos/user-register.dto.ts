import { Transform } from 'class-transformer'
import { IsEmail, MaxLength, MinLength } from 'class-validator'

export class UserRegisterDTO {
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string

    @MinLength(5)
    @MaxLength(20)
    login: string

    @MinLength(8)
    password: string
}
