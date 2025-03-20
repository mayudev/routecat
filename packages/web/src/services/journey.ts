import { Journey } from 'types';
import { serverRoot } from '.';

export const JourneyParams = {
  origin: 'origin',
  destination: 'destination',
  departure: 'departure',
  arrival: 'arrival',
};

type JourneyQuery = {
  origin: string;
  dest: string;
  departure?: string;
  arrival?: string;
};

export const journeyQueryFn =
  (query: JourneyQuery) => async (): Promise<Journey[]> => {
    const searchParams = new URLSearchParams(query);

    const req = await fetch(
      serverRoot + '/api/journey?' + searchParams.toString()
    );
    if (!req.ok) {
      throw new Error(req.status.toString());
    }

    return await req.json();
  };
