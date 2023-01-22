import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type CurrUser = {
  sub: string
  username: string
  iat: number
  exp: number
}

export const GetCurrentUser = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()

  if (!data) {
    return request.user
  }
  return request.user[data]
})
