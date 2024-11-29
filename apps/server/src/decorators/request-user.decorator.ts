import { Request } from 'express'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const RequestUser = createParamDecorator((data: never, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>()
  return request.$USER
})
