import { NextFunction, Request, Response } from 'express'
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

declare module 'express' {
  interface Request {
    $USER?: object
  }
}

@Injectable()
export class RequestUserMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(req: Request, res: Response, next: NextFunction) {
    // Here you implement the logic which extracts the user from the request. For example,
    // you call the database to extract the user. And then assign him to the request
    req['$USER'] = { username: 'guest' }
    next()
  }
}
