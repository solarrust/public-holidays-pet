import React from 'react';
import { Country } from '@/types';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface SearchFormProps {
  list: Country[];
  onChange: (item: Country) => void;
}

export default function SearchForm({ list, onChange }: SearchFormProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('country', term);
    } else {
      params.delete('country');
    }

    replace(`${pathname}?${params.toString()}`);
  }
  const formatResult = (item: Country) => {
    return (
      <div key={item.id}>
        {getUnicodeFlagIcon(`${item.isoCode}`)} {item.name}
      </div>
    );
  };

  return (
    <>
      <p className="mb-2">Choose country</p>
      <ReactSearchAutocomplete
        items={list}
        formatResult={formatResult}
        onSelect={(item) => onChange(item)}
        styling={{ zIndex: 1 }}
        inputSearchString={searchParams?.get('country')?.toString() || ''}
        onSearch={handleSearch}
      />
    </>
  );
}
