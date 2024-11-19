import React from 'react'
import { Country } from '@/types'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function SearchForm({ list, onChange }: { list: Country[]; onChange: (item: Country) => void }) {
  const formatResult = (item: Country) => {
    return (
      <div key={item.id}>
        {getUnicodeFlagIcon(`${item.isoCode}`)} {item.name}
      </div>
    )
  }
  return (
    <>
      <p className="mb-2">Choose country</p>
      <ReactSearchAutocomplete
        items={list}
        autoFocus
        formatResult={formatResult}
        onSelect={(item) => onChange(item)}
        styling={{ zIndex: 1 }}
      />
    </>
  )
}
