export interface PageProps<
  T extends {
    Queries?: Record<string, string | string[] | undefined>
    Params?: Record<string, string | string[] | undefined>
  } = Record<string, string>,
> {
  searchParams: Promise<
    (T['Queries'] extends undefined ? Record<string, string> : T['Queries']) & {
      'coming-from'?: string
      [key: string]: string | string[] | undefined
    }
  >
  params: Promise<
    (T['Params'] extends undefined ? Record<string, string> : T['Params']) & {
      [key: string]: string | string[] | undefined
    }
  >
}
