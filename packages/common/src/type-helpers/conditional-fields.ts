export type ConditionalField<Cond, Type> = Cond extends true
  ? Type
  : Cond extends null
  ? Type | null
  : never

export type FilterNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K]
}
