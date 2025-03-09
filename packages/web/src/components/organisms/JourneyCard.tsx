import { Journey } from 'types';
import styles from './JourneyCard.module.css';
import { useMemo } from 'react';
import { useTripDates } from '../../hooks/useTripDates';

type Props = {
  data: Journey;
};

export const JourneyCard = ({ data }: Props) => {
  const origin = useMemo(() => data.legs[0].origin, [data]);
  const destination = useMemo(
    () => data.legs[data.legs.length - 1].destination,
    [data]
  );

  const { duration, start, end } = useTripDates(origin!, destination!);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.times}>
          {start} - {end}
        </span>
        <span className={styles.duration}>{duration}</span>
      </div>
      {data.legs.map(leg => (
        <div>{leg.line.name}</div>
      ))}
    </div>
  );
};
