import dayjs from 'dayjs';
import { useMemo } from 'react';
import { StopData } from 'types';

const getTripDuration = (ms: number) => {
  const s = ms / 1000;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);

  return [h, m];
};

const hhmm = 'HH:mm';

export const useTripDates = (origin: StopData, destination: StopData) => {
  const departure = useMemo(() => dayjs(origin?.planned ?? 0), [origin]);
  const arrival = useMemo(
    () => dayjs(destination?.planned ?? 0),
    [destination]
  );
  const actualDeparture = useMemo(
    () => origin.actual && dayjs(origin.actual).format(hhmm),
    [origin]
  );

  const actualArrival = useMemo(
    () => destination.actual && dayjs(destination.actual).format(hhmm),
    [destination]
  );

  const start = departure.format(hhmm);
  const end = arrival.format(hhmm);

  const [hours, minutes] = getTripDuration(arrival.diff(departure));
  const formattedDuration = useMemo(() => {
    if (hours < 1) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    else
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${
        minutes > 1 ? 's' : ''
      }`;
  }, [hours, minutes]);

  return {
    duration: formattedDuration,
    start,
    end,
    actualDeparture,
    actualArrival,
  };
};
