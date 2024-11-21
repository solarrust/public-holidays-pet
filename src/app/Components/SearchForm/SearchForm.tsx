import React from 'react';
import { Country } from '@/types';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

interface SearchFormProps {
  list: Country[];
  onChange: (item: Country) => void;
}

function findCountryByName(countriesList: Country[], name: string) {
  return countriesList.find((country) => country.name === name);
}

export default function SearchForm({ list, onChange }: SearchFormProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('country', term);
    } else {
      params.delete('country');
    }

    replace(`${pathname}?${params.toString()}`);

    const selectedCountry = findCountryByName(list, term);
    if (selectedCountry) {
      onChange(selectedCountry);
    }
  });

  const defaultCountry = findCountryByName(list, searchParams.get('country') || '') || null;

  return (
    <Autocomplete
      id="country-select"
      autoSelect={true}
      clearOnEscape={true}
      fullWidth={true}
      options={list}
      autoHighlight
      getOptionLabel={(option) => option.name}
      value={defaultCountry}
      onChange={(_, value) => {
        handleChange(value?.name || '');
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
            {getUnicodeFlagIcon(option.isoCode)} {option.name} ({option.isoCode})
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
}
