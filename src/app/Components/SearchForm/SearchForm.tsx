import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { useDebouncedCallback } from 'use-debounce';

import { findCountryByName } from '@/app/utils';
import { Country } from '@/types';
import { Autocomplete, Box, TextField } from '@mui/material';

interface SearchFormProps {
  list: Country[];
}

export default function SearchForm({ list }: SearchFormProps) {
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
