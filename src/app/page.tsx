'use client'
import { useEffect, useState } from 'react'
import { Country, Holiday } from '@/types'
import SearchForm from './Components/SearchForm/SearchForm'
import Results from './Components/Results/Results'
import Footer from './Components/Footer/Footer'
import { fetchCountries, fetchHolidays } from './api'

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [holidaysList, setHolidaysList] = useState<Holiday[] | null>(null)
  const today = new Date().toISOString().slice(0, 10)

  function selectOnchange(item: Country) {
    setSelectedCountry(item.isoCode)
  }

  useEffect(() => {
    fetchCountries().then((data) => setCountries(data))
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      fetchHolidays(selectedCountry, today).then((data) => setHolidaysList(data))
    }
  }, [selectedCountry])

  return (
    <div className="max-w-5xl mx-auto min-h-dvh py-8 grid">
      <div>
        <h1 className="text-center text-5xl mb-4">Holidays 2024</h1>
        {countries.length === 0 && <div>Loading...</div>}
        {countries.length > 0 && <SearchForm list={countries} onChange={selectOnchange} />}
        {holidaysList && <Results holidaysList={holidaysList} today={today} />}
      </div>
      <Footer />
    </div>
  )
}
