import { Country, Holiday, RawCountry, RawHoliday } from '@/types';

export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`https://openholidaysapi.org/Countries`);

    if (!response.ok) {
      throw new Error('Fetching Countries Failed!');
    }
    const countries: RawCountry[] = await response.json();

    return countries.map((item: RawCountry) => ({
      ...item,
      id: item.isoCode,
      name: item.name[0]?.text,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchHolidays(countryIsoCode: string): Promise<Holiday[]> {
  try {
    const response = await fetch(
      `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${countryIsoCode}&validFrom=2024-01-01&validTo=2024-12-31`,
    );

    if (!response.ok) {
      throw new Error('Fetching Holidays Failed!');
    }

    const holidays: RawHoliday[] = await response.json();

    return holidays
      .map((item: RawHoliday) => {
        const englishName = item.name.find((n) => n.language === 'EN')?.text || '';

        return {
          ...item,
          name: englishName,
        };
      })
      .filter((item: Holiday) => item.nationwide);
  } catch (error) {
    console.error(error);
    return [];
  }
}
