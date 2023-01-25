import { Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'

export class NewsUpdateDTO {
    id: number

    @IsOptional()
    @Transform(({ value }) => value.toLowerCase())
    title?: string

    @IsOptional()
    @Transform(({ value }) => value.toLowerCase())
    description?: string

    @IsOptional()
    @Transform(({ value }) => value.toLowerCase())
    content?: string
}
