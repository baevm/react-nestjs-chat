import { Injectable } from '@nestjs/common/decorators'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'

type JwtPayload = {
  sub: string
  username: string
}

const cookieExtractFromRequest = (req: any) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['ACCESS_TOKEN']
  }
  return token
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: cookieExtractFromRequest,
      secretOrKey: 'at-secret',
    })
  }

  validate(payload: JwtPayload) {
    return payload
  }
}
