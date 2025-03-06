import { StationData } from 'types';

type StopQuery = {
  search: string;
};

export const stopsQueryFn =
  (query: StopQuery) => async (): Promise<StationData[]> => {
    const searchParams = new URLSearchParams(query);

    const req = await fetch('/api/stops?' + searchParams.toString());
    if (!req.ok) {
      throw new Error(req.status.toString());
    }

    return await req.json();
  };
