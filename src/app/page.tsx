'use client';
import React, { useEffect, useState } from 'react';
import { Country, Holiday } from '@/types';
import SearchForm from './components/SearchForm/SearchForm';
import Results from './components/Results/Results';
import Footer from './components/Footer/Footer';
import { fetchCountries, fetchHolidays } from './api';
import { HolidaysContext } from './contexts';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [holidaysList, setHolidaysList] = useState<Holiday[] | undefined>(undefined);

  function handleSelect(item: Country) {
    fetchHolidays(item.isoCode).then((data) => setHolidaysList(data));
  }

  useEffect(() => {
    fetchCountries().then((data) => setCountries(data));
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <HolidaysContext.Provider value={holidaysList}>
        <CssBaseline />
        <div className="max-w-5xl mx-auto min-h-dvh py-8 grid">
          <div>
            <h1 className="text-center text-5xl mb-4">Holidays 2024</h1>
            {!countries && <p className="text-center text-2xl">Loading...</p>}
            {countries && <SearchForm list={countries} onChange={handleSelect} />}
            {holidaysList && <Results />}
          </div>
          <Footer />
        </div>
      </HolidaysContext.Provider>
    </ThemeProvider>
  );
}
