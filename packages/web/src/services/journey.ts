import { Journey } from 'types';

export const JourneyParams = {
  origin: 'origin',
  destination: 'destination',
  journeyDate: 'journeyDate',
};

type JourneyQuery = {
  origin: string;
  dest: string;
  departure: string;
};

export const journeyQueryFn =
  (query: JourneyQuery) => async (): Promise<Journey[]> => {
    const searchParams = new URLSearchParams(query);

    const req = await fetch('/api/journey?' + searchParams.toString());
    if (!req.ok) {
      throw new Error(req.status.toString());
    }

    return await req.json();
  };
