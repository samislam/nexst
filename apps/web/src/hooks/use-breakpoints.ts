import tailwindConfig from 'tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'
import { create } from '@kodingdotninja/use-tailwind-breakpoint'

const config = resolveConfig(tailwindConfig)

export const { useBreakpoint, useBreakpointEffect, useBreakpointValue } = create(
  config.theme.screens
)
