export interface Country {
  isoCode: string;
  name: any;
  officialLanguages: string[];
}

export interface Holiday {
  comment: [
    {
      language: string;
      text: string;
    },
  ];
  endDate: Date;
  id: string;
  name: {
    language: string;
    text: string;
  }[];
  nationwide: boolean;
  regionalScope: string;
  startDate: Date;
  subdivisions: [
    {
      code: string;
      shortName: string;
    },
  ];
  temporalScope: string;
  type: string;
}
