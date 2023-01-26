import { EmailRegExp } from '../email.regexp'
import { LoginRegExp } from '../login.regexp'
import { PasswordRegExp } from '../password.regexp'

describe('getHashHelper', () => {
    let emailRegexp: typeof EmailRegExp
    let loginRegexp: typeof LoginRegExp
    let passwordRegexp: typeof PasswordRegExp

    beforeEach(() => {
        emailRegexp = EmailRegExp
        loginRegexp = LoginRegExp
        passwordRegexp = PasswordRegExp
    })

    it('should be defined all RegExps', () => {
        expect(emailRegexp).toBeDefined()
        expect(loginRegexp).toBeDefined()
        expect(passwordRegexp).toBeDefined()
    })

    it('check correct email RegExp', () => {
        expect(emailRegexp.test('email@email.com')).toEqual(true)
        expect(emailRegexp.test('email@e')).toEqual(false)
    })

    it('check correct login RegExp', () => {
        expect(loginRegexp.test('MyLogin223')).toEqual(true)
        expect(loginRegexp.test('log_in')).toEqual(false)
    })

    it('check correct password RegExp', () => {
        expect(passwordRegexp.test('Pa$$w0rd')).toEqual(true)
        expect(passwordRegexp.test('password')).toEqual(false)
    })
})
