import { Holiday } from '@/types';
import { createContext, useContext } from 'react';

export const HolidaysContext = createContext<Holiday[] | undefined>(undefined);

export function useHolidaysContext() {
  const context = useContext(HolidaysContext);
  if (context === undefined) {
    throw new Error('useHolidaysContext must be used within a HolidaysProvider');
  }
  return context;
}

export const TodayContext = createContext<string | undefined>(undefined);

export function useTodayContext() {
  const context = useContext(TodayContext);
  if (context === undefined) {
    throw new Error('useTodayContext must be used within a TodayProvider');
  }
  return context;
}
