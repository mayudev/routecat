import dayjs from 'dayjs';
import { useMemo } from 'react';
import { StopData } from 'types';

export const getTripDuration = (ms: number) => {
  const s = ms / 1000;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);

  return [h, m];
};

export const formatTripDuration = (hours: number, minutes: number) => {
  if (hours < 1) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  else
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${
      minutes > 1 ? 's' : ''
    }`;
};

export const useTripDuration = (origin: StopData, destination: StopData) => {
  const departure = useMemo(() => dayjs(origin?.planned ?? 0), [origin]);
  const arrival = useMemo(
    () => dayjs(destination?.planned ?? 0),
    [destination]
  );

  const [hours, minutes] = getTripDuration(arrival.diff(departure));
  const formattedDuration = useMemo(
    () => formatTripDuration(hours, minutes),
    [hours, minutes]
  );

  return {
    duration: formattedDuration,
  };
};
