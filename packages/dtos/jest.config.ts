import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

export default {
  testEnvironment: 'node',
  passWithNoTests: true,
  transform: {
    '^.+\\.ts$': ['ts-jest', {}],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
} satisfies Config
