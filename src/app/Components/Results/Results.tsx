import React from 'react';
import { formatDate } from 'date-fns';

import { TodayContext } from '@/app/contexts';

import HolidaysAccordion from '../Accordion/Accordion';

export default function Results() {
  const today = formatDate(new Date(), 'yyyy-MM-dd').toString();
  return (
    <TodayContext.Provider value={today}>
      <HolidaysAccordion />
    </TodayContext.Provider>
  );
}
