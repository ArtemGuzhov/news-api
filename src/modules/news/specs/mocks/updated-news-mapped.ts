import { News } from '../../services/interfaces/news.interface'
import { dateMock } from '../../../../shared/mocks/date.mock'
import { userEntityMock } from '../../../users/specs/mocks/user-entity.mock'

export const updatedNewsMappedMock: News = {
    id: 1,
    title: 'newTitle',
    description: 'newDescription',
    content: 'newContent',
    publishedAt: dateMock,
    author: userEntityMock.login,
}
