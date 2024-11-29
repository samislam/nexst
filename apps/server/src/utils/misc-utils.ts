import { ExtractEntity } from '@/types/misc-types'
import { Repository, ValueTransformer } from 'typeorm'
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata'

/**
 * Since TypeORM requires the value transformer to include both the `to` & the `from` callbacks,
 * this funciton is used as a shorthand for ignoring the `to` callback.
 */
export const from = <R = any, V = any>(fromFn: (val: V) => R): ValueTransformer => ({
  to: (val: any) => val,
  from: fromFn,
})

/**
 * This function is used to get the columns metadata and column names from a typeorm repository,
 * it's useful when you want for example to query with the find method when using the `select` flag
 */
export const getColumns = <E extends object, T extends Repository<E> = Repository<E>>(
  repo: T,
  excludeNotSelected = false
) => {
  let columns: ColumnMetadata[] = repo.metadata.columns
  if (excludeNotSelected) columns = columns.filter((col) => col.isSelect)
  return {
    columns,
    get names() {
      type InferredE = ExtractEntity<T>
      return columns.map((col) => col.propertyName as keyof InferredE)
    },
  }
}
