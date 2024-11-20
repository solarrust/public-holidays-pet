import { Holiday } from '@/types'
import { createContext, useContext } from 'react'

export const HolidaysContext = createContext<Holiday[] | undefined>(undefined)

export function useHolidaysContext() {
  const context = useContext(HolidaysContext)
  if (context === undefined) {
    throw new Error('useHolidaysContext must be used within a HolidaysProvider')
  }
  return context
}
