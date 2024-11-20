import React from 'react';
import Accordion from '../Accordion/Accordion';
import { TodayContext } from '@/app/context';
import { formatDate } from 'date-fns';

export default function Results() {
  const today = formatDate(new Date(), 'yyyy-MM-dd').toString();
  return (
    <TodayContext.Provider value={today}>
      <Accordion />
    </TodayContext.Provider>
  );
}
