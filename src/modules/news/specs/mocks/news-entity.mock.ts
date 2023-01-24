import { NewsEntity } from '../../entities/news.entity'
import { dateMock } from '../../../../shared/mocks/date.mock'

export const newsEntityMock: NewsEntity = {
    id: 1,
    title: 'title',
    description: 'description',
    content: 'content',
    createdAt: dateMock,
    updatedAt: dateMock,
    deletedAt: null,
}
