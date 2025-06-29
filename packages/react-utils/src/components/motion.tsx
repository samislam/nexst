import React from 'react'
import * as motion from 'framer-motion/client'
import { type MotionProps } from 'framer-motion'

// Define types for different HTML elements with motion props
export type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement>
export type MotionSpanProps = MotionProps & React.HTMLAttributes<HTMLSpanElement>
export type MotionH2Props = MotionProps & React.HTMLAttributes<HTMLHeadingElement>
export type MotionPProps = MotionProps & React.HTMLAttributes<HTMLParagraphElement>
export type MotionAProps = MotionProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
export type MotionPathProps = MotionProps & React.SVGProps<SVGPathElement>
export type MotionTrProps = MotionProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>

// Export typed motion components
export const MotionDiv = motion.div as React.FC<MotionDivProps>
export const MotionSpan = motion.span as React.FC<MotionSpanProps>
export const MotionH2 = motion.h2 as React.FC<MotionH2Props>
export const MotionP = motion.p as React.FC<MotionPProps>
export const MotionA = motion.a as React.FC<MotionAProps>
export const MotionPath = motion.path as React.FC<MotionPathProps>
export const MotionTr = motion.tr as React.FC<MotionTrProps>
