import React from 'react';
import { Holiday } from '@/types';
import { format } from 'date-fns';

interface AccordionItemProps {
  list: Holiday[];
  defaultChecked?: boolean;
}

export default function AccordionItem({ list, defaultChecked }: AccordionItemProps) {
  return (
    <div className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" defaultChecked={defaultChecked} />
      <div className="collapse-title text-xl font-medium">Holidays before today</div>
      <div className="collapse-content">
        <ul className="grid gap-2 mt-8 text-2xl">
          {list.map((item) => (
            <li key={item.id}>
              <span className="font-bold">
                {format(item.startDate, 'd MMMM yyyy, EEEE')} {item.isToday && '(Today)'}
              </span>{' '}
              — {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
