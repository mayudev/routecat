import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { JourneyParams, journeyQueryFn } from '../services/journey';
import { Spinner } from '../components/atoms/Spinner';
import { JourneyCard } from '../components/organisms/JourneyCard';

import styles from './Journey.module.css';

export const Journey = () => {
  const [searchParams] = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ['journey', searchParams.toString()],
    queryFn: journeyQueryFn({
      origin: searchParams.get(JourneyParams.origin)!,
      dest: searchParams.get(JourneyParams.destination)!,
      departure: searchParams.get(JourneyParams.journeyDate)!,
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
