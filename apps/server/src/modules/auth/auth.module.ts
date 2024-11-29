import { Request } from 'express'
import { REQUEST } from '@nestjs/core'
import { REQUEST_USER } from '@/constants'
import { Global, Module } from '@nestjs/common'

@Global()
@Module({
  providers: [
    {
      provide: REQUEST_USER,
      useFactory: (req: Request) => {
        const { $USER } = req
        return $USER
      },
      inject: [REQUEST],
    },
  ],
  exports: [REQUEST_USER],
})
export class AuthModule {}
