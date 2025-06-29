import { ValueTransformer } from 'typeorm'

/**
 * Since TypeORM requires the value transformer to include both the `to` & the `from` callbacks,
 * this function is used as a shorthand for ignoring the `to` callback. This simple utility function
 * is useful in the context of this DMA module because the rule says you must never write directly
 * to the database of the DMA and change its tables and columns. Also, this module never writes to
 * the database; instead, it uses the DMA APIs to interact with it for writing operations.
 */
export const from = <R = unknown, V = unknown>(fromFn: (val: V) => R): ValueTransformer => ({
  to: (val: R): V => val as unknown as V,
  from: fromFn,
})
