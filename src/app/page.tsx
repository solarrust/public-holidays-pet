'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Country, Holiday } from '@/types';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Footer from './components/Footer/Footer';
import Results from './components/Results/Results';
import SearchForm from './components/SearchForm/SearchForm';
import { fetchCountries, fetchHolidays } from './api';
import { findCountryByName } from './utils';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  const searchParams = useSearchParams();
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [holidaysList, setHolidaysList] = useState<Holiday[] | undefined>(undefined);
  const countryFromQuery = searchParams.get('country') || '';
  const country = countries ? findCountryByName(countries, countryFromQuery) : null;

  useEffect(() => {
    fetchCountries()
      .then((data) => setCountries(data))
      .catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    if (country) {
      fetchHolidays(country.isoCode)
        .then((data) => setHolidaysList(data))
        .catch(() => setHolidaysList([]));
    } else {
      setHolidaysList([]);
    }
  }, [country]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="max-w-5xl mx-auto min-h-dvh p-8 grid">
        <div>
          <h1 className="text-center text-5xl mb-4">
            <span>{countryFromQuery} </span>
            Holidays 2024
          </h1>
          {!countries && <p className="text-center text-2xl">Loading...</p>}
          {countries && <SearchForm list={countries} />}
          {holidaysList && holidaysList.length > 0 && <Results list={holidaysList} />}
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
