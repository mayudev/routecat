import { Journey } from 'types';
import styles from './JourneyCard.module.css';
import { useCallback, useMemo, useState } from 'react';
import { useTripDuration } from '../../hooks/useTripDuration';
import { TrainTimeset } from '../molecules/TrainTimeset';
import { JourneyVisualization } from '../molecules/JourneyVisualization';
import { PiCaretDown, PiCaretUp } from 'react-icons/pi';
import { JourneyLegDetail } from '../molecules/JourneyLegDetail';

type Props = {
  data: Journey;
};

export const JourneyCard = ({ data }: Props) => {
  const [expand, setExpand] = useState(false);

  const legs = useMemo(
    () =>
      data.legs.filter(leg => leg.distance || (!leg.distance && !leg.walking)),
    [data.legs]
  );

  const origin = useMemo(() => data.legs[0].origin, [data]);
  const destination = useMemo(
    () => data.legs[data.legs.length - 1].destination,
    [data]
  );

  const { duration } = useTripDuration(origin!, destination!);

  const toggleExpand = useCallback(() => setExpand(!expand), [expand]);

  return (
    <div className={styles.card}>
      <div onClick={toggleExpand}>
        <div className={styles.header}>
          <TrainTimeset stop={origin} />
          <TrainTimeset stop={destination} />
          <span className={styles.duration}>{duration}</span>
          <span style={{ flex: 1 }}></span>
          {expand ? <PiCaretUp /> : <PiCaretDown />}
        </div>
        <JourneyVisualization legs={data.legs} />
      </div>
      {expand && (
        <div>
          {legs.map((leg, i) => (
            <JourneyLegDetail
              key={leg.id}
              leg={leg}
              previous={i > 0 ? legs[i - 1] : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};
