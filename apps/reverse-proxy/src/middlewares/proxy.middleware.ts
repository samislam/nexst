import type { Request, Response } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const proxyMiddleware = () =>
  createProxyMiddleware<Request, Response>({
    target: process.env.PROXY_TARGET,
    changeOrigin: true,
  })
