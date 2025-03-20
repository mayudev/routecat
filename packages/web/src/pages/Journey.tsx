import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { JourneyParams, journeyQueryFn } from '../services/journey';
import { Spinner } from '../components/atoms/Spinner';
import { JourneyCard } from '../components/organisms/JourneyCard';

import styles from './Journey.module.css';
import { PiXCircle } from 'react-icons/pi';

export const Journey = () => {
  const [searchParams] = useSearchParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['journey', searchParams.toString()],
    queryFn: journeyQueryFn({
      origin: searchParams.get(JourneyParams.origin)!,
      dest: searchParams.get(JourneyParams.destination)!,
      ...(searchParams.has(JourneyParams.departure)
        ? { departure: searchParams.get(JourneyParams.departure)! }
        : { arrival: searchParams.get(JourneyParams.arrival)! }),
    }),
    retry: false,
  });

  return (
    <div className={styles.journeys}>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
          Looking for the best routes for you
        </div>
      ) : isError ? (
        <div className={styles.spinner}>
          <PiXCircle size={48} />
          Sorry, an error has occurred.
        </div>
      ) : (
        <div>
          {data?.map(journey => (
            <JourneyCard data={journey} />
          ))}
        </div>
      )}
    </div>
  );
};
