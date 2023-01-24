import { CommonBaseEntity } from '../../../shared/entities/common-base.entity'
import { Entity, Column } from 'typeorm'

@Entity('news')
export class NewsEntity extends CommonBaseEntity {
    @Column({ type: 'text' })
    title: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'text' })
    content: string
}
