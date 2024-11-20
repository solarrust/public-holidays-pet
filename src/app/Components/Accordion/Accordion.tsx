import React from 'react'
import { Holiday } from '@/types'
import AccordionItem from './AccordionItem'

export default function Accordion({ holidaysList, today }: { holidaysList: Holiday[]; today: string }) {
  const holidaysBeforeToday: Holiday[] = [],
    holidaysAfterToday: Holiday[] = []

  for (let i = 0; i < holidaysList.length; i++) {
    if (holidaysList[i].startDate.toString() < today) {
      holidaysBeforeToday.push(holidaysList[i])
    } else {
      holidaysAfterToday.push(holidaysList[i])
    }
  }

  return (
    <div className="join join-vertical w-full mt-8">
      <AccordionItem list={holidaysBeforeToday} defaultChecked={false} />
      <AccordionItem list={holidaysAfterToday} defaultChecked={true} />
    </div>
  )
}
