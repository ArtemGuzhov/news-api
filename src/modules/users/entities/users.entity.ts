import { CommonBaseEntity } from '../../../shared/entities/common-base.entity'
import { Entity, Column, OneToMany, JoinColumn } from 'typeorm'
import { NewsEntity } from '../../news/entities/news.entity'

@Entity('users')
export class UsersEntity extends CommonBaseEntity {
    @Column({ type: 'text', unique: true })
    login: string

    @Column({ type: 'text', unique: true })
    email: string

    @Column({ type: 'text' })
    password: string

    @Column({ type: 'text', nullable: true })
    refreshToken: string | null

    @OneToMany(() => NewsEntity, news => news.user)
    @JoinColumn({ name: 'news_id' })
    news: NewsEntity[]
}
