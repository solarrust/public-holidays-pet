export interface RawCountry {
  id: string
  isoCode: string
  name: { language: string; text: string }[]
  officialLanguages: string[]
}

export interface Country {
  id: string
  isoCode: string
  name: string
  officialLanguages: string[]
}

export interface Holiday {
  comment: [
    {
      language: string
      text: string
    },
  ]
  endDate: Date
  id: string
  name: {
    language: string
    text: string
  }[]
  nationwide: boolean
  regionalScope: string
  startDate: Date
  subdivisions: [
    {
      code: string
      shortName: string
    },
  ]
  temporalScope: string
  type: string
}
