import React from 'react';
import { Holiday } from '@/types';
import AccordionItem from './AccordionItem';
import { useHolidaysContext, useTodayContext } from '@/app/context';

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
      <AccordionItem title="Holidays before today" list={holidaysBeforeToday} />
      <AccordionItem title="Holidays today and after" list={holidaysAfterToday} defaultChecked={true} />
    </div>
  );
}
