import { AuthModule } from './modules/auth/auth.module'
import environmentSchema from '@/server/environment-schema'
import { ConfigModule } from '@nestjs/config'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { RequestUserMiddleware } from './middlewares/request-user.middleware'
import { RequestPreviewMiddleware } from './middlewares/request-preview.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      validationSchema: environmentSchema,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    AuthModule,
    // ? uncomment the following lines to enable database integration automatically
    // DatabaseModule,
    // ? uncomment the following lines to enable nodemailer integration automatically
    // MailerModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService<EnvironmentVars>) => ({
    //     transport: {
    //       host: config.getOrThrow('EMAIL_HOST'),
    //       auth: {
    //         user: config.getOrThrow('EMAIL_USERNAME'),
    //         pass: config.getOrThrow('EMAIL_PASSWORD'),
    //       },
    //     },
    //   }),
    // }),
    // ? uncomment the following lines to enable Global context (Nest-CLS) integration automatically
    // ClsModule.forRoot({
    //   middleware: {
    //     mount: true,
    //     setup: setupNestCls,
    //   },
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestPreviewMiddleware).forRoutes('*')
    consumer.apply(RequestUserMiddleware).forRoutes('*')
  }
}
