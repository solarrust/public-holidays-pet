'use client'
import { useEffect, useState } from 'react'
import { RawCountry, Country, Holiday, RawHoliday } from '@/types'
import SearchForm from './Components/SearchForm/SearchForm'
import Results from './Components/Results/Results'
import Footer from './Components/Footer/Footer'

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [holidaysList, setHolidaysList] = useState<Holiday[] | null>(null)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    fetch(`https://openholidaysapi.org/Countries`)
      .then((res) => res.json())
      .then((data) =>
        data.map((item: RawCountry) => ({
          ...item,
          id: item.isoCode,
          name: item.name[0]?.text,
        })),
      )
      .then((data) => setCountries(data))
  }, [])

  function selectOnchange(item: Country) {
    setSelectedCountry(item.isoCode)
  }

  useEffect(() => {
    if (selectedCountry) {
      fetch(
        `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedCountry}&validFrom=2024-01-01&validTo=2024-12-31`,
      )
        .then((res) => res.json())
        .then((data) =>
          data
            .map((item: RawHoliday) => {
              const englishName = item.name.find((n) => n.language === 'EN')?.text || ''
              let isToday: boolean = false

              if (item.startDate.toString() === today) {
                isToday = true
              }

              return {
                ...item,
                name: englishName,
                isToday,
              }
            })
            .filter((item: Holiday) => item.nationwide),
        )
        .then((data) => setHolidaysList(data))
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
