import { Tailwindest } from 'tailwindest'

export type TwClass = Tailwindest[keyof Tailwindest]
export type TwClasses = (TwClass | (string & object))[]
