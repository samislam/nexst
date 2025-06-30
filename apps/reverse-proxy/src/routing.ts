import { Router } from 'express'
import { proxyMiddleware } from './middlewares/proxy.middleware'

export const applicationRouter = Router()

applicationRouter.route('/').all(proxyMiddleware())
