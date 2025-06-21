'use client'

import Image from 'next/image'
import { cn } from '@repo/react-utils'
import appConfig from '@/config/app.config'
import { MotionDiv } from '@repo/react-utils'
import { AnimatePresence } from 'framer-motion'
import { useAnimatedDots } from '@repo/react-utils'

export interface LoadingScreenProps {
  className?: string
  isVisible?: boolean
  loadingText?: string
}

export function LoadingScreen(props: LoadingScreenProps) {
  const { isVisible, loadingText = 'Loading...', className } = props
  const dots = useAnimatedDots()
  return (
    <AnimatePresence>
      {isVisible && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={cn(
            'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm',
            className
          )}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

          {/* Main Content */}
          <MotionDiv
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="relative flex flex-col items-center space-y-8"
          >
            {/* Logo Container */}
            <div className="relative">
              {/* Animated Ring */}
              <MotionDiv
                animate={{ rotate: 360 }}
                transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
                className="absolute inset-0 h-48 w-48 rounded-full border-2 border-transparent border-r-primary/20 border-t-primary/30"
              />

              {/* Secondary Ring */}
              <MotionDiv
                animate={{ rotate: -360 }}
                transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
                className="absolute inset-2 rounded-full border border-transparent border-b-primary/20 border-l-primary/10"
              />

              {/* Logo */}
              <MotionDiv
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
                className="relative z-10 flex h-48 w-48 items-center justify-center rounded-full from-primary to-primary/80 p-5 shadow-lg"
              >
                <Image src={appConfig.appLogo} alt="Logo" />
              </MotionDiv>

              {/* Pulse Effect */}
              <MotionDiv
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full bg-primary/20"
              />
            </div>

            {/* Loading Text */}
            <MotionDiv
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              className="space-y-4 text-center"
            >
              <h2 className="text-xl font-semibold text-foreground">
                {loadingText}
                {dots}
              </h2>

              {/* Animated Dots */}
              <div className="flex items-center justify-center gap-x-1">
                {[0, 1, 2].map((i) => (
                  <MotionDiv
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="h-2 w-2 rounded-full bg-primary"
                  />
                ))}
              </div>
            </MotionDiv>

            {/* Progress Bar */}
            <MotionDiv
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
              className="relative h-1 w-64 overflow-hidden rounded-full bg-muted"
            >
              <MotionDiv
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 1.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </MotionDiv>
          </MotionDiv>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <MotionDiv
              key={i}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute h-2 w-2 rounded-full bg-primary/30"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
            />
          ))}
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}
