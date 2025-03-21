import { MetaJourneys } from 'types';
import { serverRoot } from '.';

export const JourneyParams = {
  origin: 'origin',
  destination: 'destination',
  departure: 'departure',
  arrival: 'arrival',
  earlierRef: 'earlierRef',
  laterRef: 'laterRef',
};

type JourneyQuery = {
  origin: string;
  dest: string;
  departure?: string;
  arrival?: string;
  earlierRef?: string;
  laterRef?: string;
};

export const journeyQueryFn =
  (query: JourneyQuery) => async (): Promise<MetaJourneys> => {
    const searchParams = new URLSearchParams(query);

    // Why does JavaScript make me do this...?
    if (!query.earlierRef) searchParams.delete(JourneyParams.earlierRef);
    if (!query.laterRef) searchParams.delete(JourneyParams.laterRef);

    const req = await fetch(
      serverRoot + '/api/journey?' + searchParams.toString()
    );
    if (!req.ok) {
      throw new Error(req.status.toString());
    }

    return await req.json();
  };
