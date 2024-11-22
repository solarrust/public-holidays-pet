import React from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

import { render, screen, waitFor } from '@testing-library/react';

import { fetchCountries, fetchHolidays } from './api';
import Home from './page';

import '@testing-library/jest-dom';

jest.mock('./api');
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
}));

const mockFetchCountries = fetchCountries as jest.MockedFunction<typeof fetchCountries>;
const mockFetchHolidays = fetchHolidays as jest.MockedFunction<typeof fetchHolidays>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;

describe('Home', () => {
  beforeEach(() => {
    mockFetchCountries.mockResolvedValue([
      {
        name: 'Country1',
        isoCode: 'C1',
        id: '1',
      },
      {
        name: 'Country2',
        isoCode: 'C2',
        id: '2',
      },
    ]);
    mockFetchHolidays.mockResolvedValue([
      { name: 'Holiday1', startDate: '2024-01-01', endDate: '2024-01-01', nationwide: false, id: '1' },
      { name: 'Holiday2', startDate: '2024-12-25', endDate: '2024-12-25', nationwide: true, id: '2' },
    ]);
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('Country1'),
    } as unknown as ReadonlyURLSearchParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders SearchForm when countries are fetched', async () => {
    const mockCountries = [
      { id: '1', isoCode: 'DE', name: 'Germany' },
      { id: '2', isoCode: 'EN', name: 'United Kingdom' },
    ];
    mockFetchCountries.mockResolvedValueOnce(mockCountries);

    render(<Home />);

    await waitFor(() => expect(mockFetchCountries).toHaveBeenCalledTimes(1));

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders Results when holidays are fetched', async () => {
    render(<Home />);

    await waitFor(() => expect(mockFetchHolidays).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Holidays after today')).toBeInTheDocument();
  });

  it('renders no holidays message when no holidays are found', async () => {
    mockFetchHolidays.mockResolvedValueOnce([]);
    render(<Home />);

    await waitFor(() => expect(mockFetchHolidays).toHaveBeenCalledTimes(1));

    expect(screen.queryByText('Holiday1')).not.toBeInTheDocument();
    expect(screen.queryByText('Holiday2')).not.toBeInTheDocument();
  });
});
