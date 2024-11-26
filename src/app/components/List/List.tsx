import React from 'react';
import { format } from 'date-fns';

import { Holiday } from '@/types';

interface ListProps {
  holidays: Holiday[];
  placeholder: string;
}

export default function List({ holidays, placeholder }: ListProps) {
  return (
    <ul className="grid gap-2 mt-8 text-2xl">
      {holidays.length === 0 ? (
        <li>{placeholder}</li>
      ) : (
        holidays.map((item) => (
          <li key={item.id}>
            <span className="font-bold">{format(item.startDate, 'd MMMM yyyy, EEEE')}</span> — {item.name}
          </li>
        ))
      )}
    </ul>
  );
}
