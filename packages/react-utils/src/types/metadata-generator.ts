import { Metadata } from 'next'

export type MetadataGenerateFn = () => Promise<Metadata> | Metadata
