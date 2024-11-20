import { Country, Holiday, RawCountry, RawHoliday } from '@/types'

export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(`https://openholidaysapi.org/Countries`)
  const countries: RawCountry[] = await res.json()

  return countries.map((item: RawCountry) => ({
    ...item,
    id: item.isoCode,
    name: item.name[0]?.text,
  }))
}

export async function fetchHolidays(countryIsoCode: string, today: string): Promise<Holiday[]> {
  const res = await fetch(
    `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${countryIsoCode}&validFrom=2024-01-01&validTo=2024-12-31`,
  )
  const holidays: RawHoliday[] = await res.json()

  return holidays
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
    .filter((item: Holiday) => item.nationwide)
}
