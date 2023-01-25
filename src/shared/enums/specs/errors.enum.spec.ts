import { ErrorsEnum } from '../errors.enum'

describe('ErrorsEnum', () => {
    let testedEnum: typeof ErrorsEnum

    beforeEach(() => {
        testedEnum = ErrorsEnum
    })

    it('compliance check ErrorEnum', () => {
        expect(ErrorsEnum.NEWS_NOT_FOUND).toEqual('NEWS_NOT_FOUND')
        expect(ErrorsEnum.USER_NOT_FOUND).toEqual('USER_NOT_FOUND')
        expect(ErrorsEnum.NOT_A_STRONG_PASSWORD).toEqual('NOT_A_STRONG_PASSWORD')
        expect(ErrorsEnum.INCORRECT_LOGIN).toEqual('INCORRECT_LOGIN')
        expect(ErrorsEnum.INCORRECT_EMAIL).toEqual('INCORRECT_EMAIL')
        expect(ErrorsEnum.USER_WITH_THIS_EMAIL_ALREADY_EXIST).toEqual('USER_WITH_THIS_EMAIL_ALREADY_EXIST')
        expect(ErrorsEnum.USER_WITH_THIS_LOGIN_ALREADY_EXIST).toEqual('USER_WITH_THIS_LOGIN_ALREADY_EXIST')
        expect(ErrorsEnum.REFRESH_TOKEN_MALFORMED).toEqual('REFRESH_TOKEN_MALFORMED')
        expect(ErrorsEnum.ACCESS_DENIED).toEqual('ACCESS_DENIED')
        expect(ErrorsEnum.INCORRECT_EMAIL_OR_PASSWORD).toEqual('INCORRECT_EMAIL_OR_PASSWORD')
    })
})
