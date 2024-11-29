import morgan from 'morgan'
import { isEmpty } from 'lodash'
import { NextFunction, Request, Response } from 'express'
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

@Injectable()
export class RequestPreviewMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV !== 'development') return next()

    morgan((tokens, req: Request, res) => {
      // Standard log format from morgan
      const log = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res),
        'ms',
      ].join(' ')

      // Log the request using morgan format, then print body with console.dir
      this.logger.log(log)
      if (!isEmpty(req.body)) console.dir(req.body, { colors: true, depth: true })

      return null // Necessary for morgan to proceed without repeating logs
    })(req, res, next)
  }
}
