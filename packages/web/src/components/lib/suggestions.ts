type SuggestionStation = {
  stationId: string;
  stationName: string;
};

export type Suggestion = {
  origin: SuggestionStation;
  destination: SuggestionStation;
};

const wienHbf = {
  stationId: '1290401',
  stationName: 'Wien Hbf',
};

export const suggestions: Suggestion[] = [
  {
    origin: wienHbf,
    destination: {
      stationId: '8100002',
      stationName: 'Salzburg Hbf',
    },
  },
  {
    origin: wienHbf,
    destination: {
      stationId: '8100173',
      stationName: 'Graz Hbf',
    },
  },
  {
    origin: {
      stationId: '8000261',
      stationName: 'München Hbf',
    },
    destination: {
      stationId: '8100108',
      stationName: 'Innsbruck Hbf',
    },
  },
];
