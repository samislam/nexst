'use client'
import { ReactNode } from 'react'
import { useBack } from '../hooks/use-back'

export interface BackButtonProps {
  children: ReactNode
  fallbackPath?: string | undefined
}

export const BackButton = (props: BackButtonProps) => {
  const { children, fallbackPath } = props
  const { back } = useBack()
  return <div onClick={() => back(fallbackPath)}>{children}</div>
}
