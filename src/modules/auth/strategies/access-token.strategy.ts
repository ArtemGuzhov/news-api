import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { environment } from '../../../environment'
import { JwtPayload } from '../services/interfaces/jwt-payload.interface'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: environment.tokenKeys.accessKey,
        })
    }

    validate(payload: Pick<JwtPayload, 'id'>) {
        return payload
    }
}
