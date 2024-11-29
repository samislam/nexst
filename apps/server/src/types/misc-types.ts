import type { EntitySchema, MixedList, Repository } from 'typeorm'

export type AnyFunction = (...args: any[]) => any
export type AnyClass = new (...args: any[]) => any
export type EntitiesList = MixedList<string | (new (...args: any[]) => any) | EntitySchema<any>>

/**
 * This type generic helper helps in extracting the entity from the typeorm Repostiry generic, for
 * instance, Repository<User>, it gives you the User
 *
 * @example
 *   type Entity = ExtractEntity<User> // Entity === User
 *
 * @template Type The typeorm repository
 */
export type ExtractEntity<Type extends object> =
  Type extends Repository<infer Entity> ? Entity : never
