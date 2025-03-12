import { StationData } from 'types';
import { serverRoot } from '.';

type StopQuery = {
  search: string;
};

export const stopsQueryFn =
  (query: StopQuery) => async (): Promise<StationData[]> => {
    const searchParams = new URLSearchParams(query);

    const req = await fetch(
      serverRoot + '/api/stops?' + searchParams.toString()
    );
    if (!req.ok) {
      throw new Error(req.status.toString());
    }

    return await req.json();
  };
