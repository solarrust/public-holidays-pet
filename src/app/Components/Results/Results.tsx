import React from 'react'
import { Holiday } from '@/types'
import { format } from 'date-fns'

export default function Results({ holidaysList, today }: { holidaysList: Holiday[]; today: string }) {
  const holidaysBeforeToday = holidaysList.filter((item) => item.startDate.toString() < today)

  const holidaysAfterToday = holidaysList.filter((item) => item.startDate.toString() >= today)

  return (
    <>
      <div className="join join-vertical w-full mt-8">
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">Holidays before today</div>
          <div className="collapse-content">
            <ul className="grid gap-2 mt-8 text-2xl">
              {holidaysBeforeToday.map((item) => (
                <li key={item.id}>
                  <span className="font-bold">{format(item.startDate, 'd MMMM yyyy, EEEE')}</span> —{' '}
                  {item.name.toString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title text-xl font-medium">Holidays today and after</div>
          <div className="collapse-content">
            <ul className="grid gap-2 mt-8 text-2xl">
              {holidaysAfterToday.map((item) => (
                <li key={item.id}>
                  <span className="font-bold">
                    {format(item.startDate, 'd MMMM yyyy, EEEE')} {item.isToday && '(Today)'}
                  </span>{' '}
                  — {item.name.toString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
