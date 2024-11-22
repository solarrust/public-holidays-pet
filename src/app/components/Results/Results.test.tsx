import React from 'react';
import { format } from 'date-fns';

import { Holiday } from '@/types';
import { render, screen } from '@testing-library/react';

import Results from './Results';

const mockHolidays: Holiday[] = [
  {
    id: '1',
    name: 'New Year',
    startDate: '2023-01-01',
    endDate: '2023-01-01',
    nationwide: false,
  },
  {
    id: '2',
    name: 'Christmas',
    startDate: '2023-12-25',
    endDate: '2023-12-25',
    nationwide: false,
  },
];

describe('Results Component', () => {
  test('renders Holidays before today', () => {
    const today = new Date().toISOString().split('T')[0];
    const holidaysBeforeToday = mockHolidays.filter((item) => item.startDate < today);

    render(<Results list={mockHolidays} />);

    const accordionSummary = screen.getByText('Holidays before today');
    expect(accordionSummary).toBeInTheDocument();

    holidaysBeforeToday.forEach((holiday) => {
      const holidayElement = screen.getByText(
        (content, element) => !!element && element.tagName.toLowerCase() === 'li' && content.includes(holiday.name),
      );
      expect(holidayElement).toBeInTheDocument();
    });
  });

  test('renders Today holiday', () => {
    const today = new Date().toISOString().split('T')[0];
    const mockHolidaysWithToday: Holiday[] = [
      ...mockHolidays,
      {
        id: '3',
        name: 'Today Holiday',
        startDate: today,
        endDate: today,
        nationwide: false,
      },
    ];

    render(<Results list={mockHolidaysWithToday} />);

    const todayHolidayElement = screen.getByText(
      (content, element) => !!element && element.tagName.toLowerCase() === 'h2' && content.includes('Today'),
    );
    expect(todayHolidayElement).toBeInTheDocument();
    expect(todayHolidayElement).toHaveTextContent('Today is Today Holiday');
    const formattedDate = format(new Date(today), 'd MMMM yyyy, EEEE');
    const dateElement = screen.getByText(formattedDate);
    expect(dateElement).toBeInTheDocument();
  });
});
