import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { JourneyParams, journeyQueryFn } from '../services/journey';
import { Spinner } from '../components/atoms/Spinner';
import { JourneyCard } from '../components/organisms/JourneyCard';

import styles from './Journey.module.css';
import { PiXCircle } from 'react-icons/pi';
import { useCallback } from 'react';
import { Button } from '../components/atoms/Button';

export const Journey = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['journey', searchParams.toString()],
    queryFn: journeyQueryFn({
      origin: searchParams.get(JourneyParams.origin)!,
      dest: searchParams.get(JourneyParams.destination)!,
      ...(searchParams.has(JourneyParams.departure)
        ? { departure: searchParams.get(JourneyParams.departure)! }
        : { arrival: searchParams.get(JourneyParams.arrival)! }),
      earlierRef: searchParams.get(JourneyParams.earlierRef) ?? undefined,
      laterRef: searchParams.get(JourneyParams.laterRef) ?? undefined,
    }),
    placeholderData: keepPreviousData,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const loadPrevious = useCallback(() => {
    setSearchParams(params => {
      params.set(JourneyParams.earlierRef, data!.earlierRef!);
      params.delete(JourneyParams.laterRef);
      return params;
    });
  }, [data, setSearchParams]);

  const loadNext = useCallback(() => {
    setSearchParams(params => {
      params.delete(JourneyParams.earlierRef);
      params.set(JourneyParams.laterRef, data!.laterRef!);
      return params;
    });
  }, [data, setSearchParams]);

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
          <div className={styles.buttonFrame}>
            <Button disabled={isFetching} onClick={loadPrevious}>
              {isFetching ? <Spinner size={24} /> : 'Earlier trips'}
            </Button>
          </div>

          {data?.journeys.map(journey => (
            <JourneyCard data={journey} />
          ))}
          <div className={styles.buttonFrame}>
            <Button disabled={isFetching} onClick={loadNext}>
              {isFetching ? <Spinner size={24} /> : 'Later trips'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
