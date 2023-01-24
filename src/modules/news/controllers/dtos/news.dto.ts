import { Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'

export class NewsDTO {
    @IsOptional()
    id?: number

    @Transform(({ value }) => value.toLowerCase())
    title: string

    @Transform(({ value }) => value.toLowerCase())
    description: string

    @Transform(({ value }) => value.toLowerCase())
    content: string
}
