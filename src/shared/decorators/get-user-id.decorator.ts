import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtPayload } from '../../modules/auth/services/interfaces/jwt-payload.interface'

export const GetUserId = createParamDecorator((_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest()

    const user = request.user as Pick<JwtPayload, 'id'>
    return user.id
})
