declare namespace NodeJS {
  interface ProcessEnv {
    PROXY_TARGET: string
    NODE_ENV: 'production' | 'development' | 'test'
    HOST: string
    PORT: number
  }
}
