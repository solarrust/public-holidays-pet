import React from 'react'
import { Holiday } from '@/types'
import Accordion from '../Accordion/Accordion'

export default function Results({ holidaysList, today }: { holidaysList: Holiday[]; today: string }) {
  return <Accordion holidaysList={holidaysList} today={today} />
}
