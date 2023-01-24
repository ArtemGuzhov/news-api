import { News } from '../../services/interfaces/news.interface'
import { dateMock } from '../../../../shared/mocks/date.mock'

export const updatedNewsMappedMock: News = {
    id: 1,
    title: 'newTitle',
    description: 'newDescription',
    content: 'newContent',
    publishedAt: dateMock,
}
