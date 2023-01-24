import { NewsEntity } from '../../entities/news.entity'
import { dateMock } from '../../../../shared/mocks/date.mock'
import { userEntityMock } from '../../../users/specs/mocks/user-entity.mock'

export const newsEntityMock: NewsEntity = {
    id: 1,
    title: 'title',
    description: 'description',
    content: 'content',
    createdAt: dateMock,
    updatedAt: dateMock,
    deletedAt: null,
    user: userEntityMock,
}
