import dayjs from 'dayjs';
import { useMemo } from 'react';
import { TripWithStopovers } from 'types';
import { formatTripDuration, getTripDuration } from './useTripDuration';

export const useWait = (
  current: TripWithStopovers,
  previous?: TripWithStopovers
) => {
  const diff = dayjs(current.origin?.actual).diff(
    dayjs(previous?.destination?.actual)
  );
  const [hours, minutes] = useMemo(() => getTripDuration(diff), [diff]);

  const formattedDuration = useMemo(
    () => formatTripDuration(hours, minutes),
    [hours, minutes]
  );

  return {
    wait: !previous || diff === 0 ? '' : formattedDuration,
    isLong: hours > 3,
  };
};
