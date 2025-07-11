import { NextResponse } from 'next/server'

export type CookieAttributes = Pick<
  NonNullable<Parameters<typeof NextResponse.prototype.cookies.set>['2']>,
  'maxAge' | 'domain' | 'partitioned' | 'path' | 'priority' | 'sameSite' | 'secure' | 'name'
>
