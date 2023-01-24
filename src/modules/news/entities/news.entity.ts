import { CommonBaseEntity } from '../../../shared/entities/common-base.entity'
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { UsersEntity } from '../../users/entities/users.entity'

@Entity('news')
export class NewsEntity extends CommonBaseEntity {
    @Column({ type: 'text' })
    title: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'text' })
    content: string

    @ManyToOne(() => UsersEntity, user => user.news, {})
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity
}
