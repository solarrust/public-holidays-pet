import React from 'react';

import { Holiday } from '@/types';
import { render } from '@testing-library/react';

import List from './List';

describe('List component', () => {
  const holidays: Holiday[] = [
    {
      id: '1',
      name: 'New Year',
      startDate: new Date('2023-01-01').toISOString(),
      endDate: new Date('2023-01-01').toISOString(),
      nationwide: false,
    },
    {
      id: '2',
      name: 'Christmas',
      startDate: new Date('2023-12-25').toISOString(),
      endDate: new Date('2023-12-25').toISOString(),
      nationwide: false,
    },
  ];

  it('renders holidays list correctly', () => {
    const { getByText } = render(<List holidays={holidays} placeholder="No holidays available" />);
    expect(getByText('1 January 2023, Sunday')).toBeInTheDocument();
    expect(getByText('25 December 2023, Monday')).toBeInTheDocument();
  });

  it('matches snapshot when holidays list is empty', () => {
    const { asFragment } = render(<List holidays={[]} placeholder="No holidays available" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
