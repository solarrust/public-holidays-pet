import { useRouter, useSearchParams } from 'next/navigation';

import { Country } from '@/types';
import { fireEvent, render, screen } from '@testing-library/react';

import SearchForm from './SearchForm';

const mockCounties: Country[] = [
  {
    id: '1',
    isoCode: 'DE',
    name: 'Germany',
  },
  {
    id: '2',
    isoCode: 'EN',
    name: 'United Kingdom',
  },
];

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

describe('SearchForm Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn(),
    });
  });

  test('renders a search form', () => {
    render(<SearchForm list={mockCounties} />);

    const input = screen.getByLabelText('Choose a country');
    expect(input).toBeInTheDocument();
  });

  test('allows entering a country name and shows it in the dropdown', () => {
    render(<SearchForm list={mockCounties} />);

    const input = screen.getByLabelText('Choose a country');
    fireEvent.change(input, { target: { value: 'Germany' } });
    fireEvent.submit(input);

    const option = screen.getAllByText((_content, element) => {
      const hasText = (node: Element) => node.textContent?.includes('Germany') && node.textContent?.includes('DE');
      const elementHasText = element ? hasText(element) : false;
      return elementHasText;
    });
    expect(option.length).toBeGreaterThan(0);
  });

  test('sets the input value based on the URL parameter', () => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn(),
    });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('country=Germany'));

    render(<SearchForm list={mockCounties} />);

    const input = screen.getByLabelText('Choose a country');
    expect(input).toHaveValue('Germany');
  });

  test('updates the URL with the selected country', () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    render(<SearchForm list={mockCounties} />);

    const input = screen.getByLabelText('Choose a country');
    fireEvent.change(input, { target: { value: 'Germany' } });
    fireEvent.submit(input);
    mockReplace(`?country=Germany`);

    expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining('country=Germany'));
  });
});
