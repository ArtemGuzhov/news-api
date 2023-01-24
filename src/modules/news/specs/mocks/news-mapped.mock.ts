import { News } from '../../services/interfaces/news.interface'
import { dateMock } from '../../../../shared/mocks/date.mock'

export const newsMappedMock: News = {
    id: 1,
    title: 'title',
    description: 'description',
    content: 'content',
    publishedAt: dateMock,
}
