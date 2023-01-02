import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { Injectable } from '@nestjs/common/decorators'

const cookieExtractFromRequest = (req: any) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['REFRESH_TOKEN']
  }
  return token
}

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: cookieExtractFromRequest,
      secretOrKey: 'rt-secret',
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: any) {
    const refreshToken = cookieExtractFromRequest(req)
    return {
      ...payload,
      refreshToken,
    }
  }
}
