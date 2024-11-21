import { Country } from '@/types';

export function findCountryByName(countriesList: Country[], name: string) {
  return countriesList.find((country) => country.name === name);
}
