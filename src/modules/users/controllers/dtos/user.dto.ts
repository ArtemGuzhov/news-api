import { Transform } from 'class-transformer'
import { IsEmail, MaxLength, MinLength } from 'class-validator'

export class UserDTO {
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string

    @MinLength(5)
    @Transform(({ value }) => value.toLowerCase())
    @MaxLength(20)
    login: string

    @MinLength(8)
    @Transform(({ value }) => value.toLowerCase())
    password: string
}
