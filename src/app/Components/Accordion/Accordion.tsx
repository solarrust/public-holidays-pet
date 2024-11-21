import React from 'react';
import { format } from 'date-fns';

import { useHolidaysContext, useTodayContext } from '@/app/contexts';
import { Holiday } from '@/types';

import AccordionItem from './AccordionItem';

export default function Accordion() {
  const holidaysList = useHolidaysContext();
  const today = useTodayContext();

  const holidaysBeforeToday: Holiday[] = [],
    holidaysAfterToday: Holiday[] = [];

  for (let i = 0; i < holidaysList.length; i++) {
    if (holidaysList[i].startDate < today) {
      holidaysBeforeToday.push(holidaysList[i]);
    } else {
      if (holidaysList[i].startDate === today) {
        holidaysList[i].isToday = true;
      }

      holidaysAfterToday.push(holidaysList[i]);
    }
  }

  return (
    <div className="join join-vertical w-full mt-8">
      <AccordionItem title="Holidays before today">
        <div className="collapse-content">
          <ul className="grid gap-2 mt-8 text-2xl">
            {holidaysBeforeToday.map((item) => (
              <li key={item.id}>
                <span className="font-bold">{format(item.startDate, 'd MMMM yyyy, EEEE')}</span> — {item.name}
              </li>
            ))}
          </ul>
        </div>
      </AccordionItem>
      <AccordionItem title="Holidays today and after" defaultChecked={true}>
        <div className="collapse-content">
          <ul className="grid gap-2 mt-8 text-2xl">
            {holidaysAfterToday.map((item) => (
              <li key={item.id}>
                <span className="font-bold">
                  {format(item.startDate, 'd MMMM yyyy, EEEE')} {item.isToday && '(Today)'}
                </span>{' '}
                — {item.name}
              </li>
            ))}
          </ul>
        </div>
      </AccordionItem>
    </div>
  );
}
