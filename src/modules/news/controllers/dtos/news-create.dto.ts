import { Transform } from 'class-transformer'

export class NewsCreateDTO {
    @Transform(({ value }) => value.toLowerCase())
    title: string

    @Transform(({ value }) => value.toLowerCase())
    description: string

    @Transform(({ value }) => value.toLowerCase())
    content: string
}
