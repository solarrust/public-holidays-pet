'use client';
import { useEffect, useState } from 'react';
import { Country, Holiday } from '@/types';
import SearchForm from './Components/SearchForm/SearchForm';
import Results from './Components/Results/Results';
import Footer from './Components/Footer/Footer';
import { fetchCountries, fetchHolidays } from './api';
import { HolidaysContext } from './context';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [holidaysList, setHolidaysList] = useState<Holiday[] | undefined>(undefined);

  function selectOnchange(item: Country) {
    if (item) {
      fetchHolidays(item.isoCode).then((data) => setHolidaysList(data));
    }
  }

  useEffect(() => {
    fetchCountries().then((data) => setCountries(data));
  }, []);

  return (
    <HolidaysContext.Provider value={holidaysList}>
      <div className="max-w-5xl mx-auto min-h-dvh py-8 grid">
        <div>
          <h1 className="text-center text-5xl mb-4">Holidays 2024</h1>
          {countries.length === 0 && <p className="text-center text-2xl">Loading...</p>}
          {countries.length > 0 && <SearchForm list={countries} onChange={selectOnchange} />}
          {holidaysList && <Results />}
        </div>
        <Footer />
      </div>
    </HolidaysContext.Provider>
  );
}
