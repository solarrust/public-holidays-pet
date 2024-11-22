import React from 'react';
import { format } from 'date-fns';

import { Holiday } from '@/types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export default function Results({ list }: { list: Holiday[] }) {
  const today = format(new Date(), 'yyyy-MM-dd').toString();

  const holidaysBeforeToday = list.filter((item) => item.startDate < today);
  const holidaysAfterToday = list.filter((item) => item.startDate >= today);

  return (
    <div className="join join-vertical w-full mt-8">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          Holidays before today
        </AccordionSummary>
        <AccordionDetails>
          <ul className="grid gap-2 mt-8 text-2xl">
            {holidaysBeforeToday.map((item) => (
              <li key={item.id}>
                <span className="font-bold">{format(item.startDate, 'd MMMM yyyy, EEEE')}</span> — {item.name}
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
          Holidays today and after
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
