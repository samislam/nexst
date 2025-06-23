import { Repository } from 'typeorm'

/**
 * This type generic helper helps in extracting the entity from the typeorm Repostiry generic, for
 * instance, Repository<DmaAp>, it gives you the DmaAp
 *
 * @example
 *   type Entity = ExtractEntity<DmaAp> // Entity === DmaAp
 *
 * @template Type The typeorm repository
 */
export type ExtractEntity<Type extends object> = Type extends Repository<infer Entity>
  ? Entity
  : never
