import { Transform } from 'class-transformer'
import { IsEmail, MinLength } from 'class-validator'

export class AuthDTO {
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string

    @MinLength(8)
    @Transform(({ value }) => value.toLowerCase())
    password: string
}
