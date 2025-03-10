import { TripWithStopovers } from 'types';
import styles from './JourneyLegDetail.module.css';
import { useTripDuration } from '../../hooks/useTripDuration';
import { TrainTimeset } from './TrainTimeset';
import { JourneyLegStops } from './JourneyLegStops';
import { normalizedLineName } from '../lib/line';
import {
  PiArrowSquareRightLight,
  PiChair,
  PiMoonStars,
  PiPersonSimpleWalk,
} from 'react-icons/pi';
import { TrainPlatforms } from './TrainPlatforms';
import { useWait } from '../../hooks/useWait';

type Props = {
  leg: TripWithStopovers;
  previous?: TripWithStopovers;
};

export const JourneyLegDetail = ({ leg, previous }: Props) => {
  const { duration } = useTripDuration(leg.origin!, leg.destination!);

  const { wait, isLong } = useWait(leg, previous);
  console.log(previous);

  return (
    <div>
      {wait && (
        <div className={styles.wait}>
          {isLong ? <PiMoonStars size={24} /> : <PiChair size={24} />} {wait}
        </div>
      )}
      <div className={styles.leg}>
        <div className={styles.station}>
          <TrainTimeset stop={leg.origin} />
          {leg.origin?.name}
          <span style={{ flex: 1 }} />
          <TrainPlatforms stop={leg.origin} />
          {leg.walking && <PiPersonSimpleWalk size={32} />}
        </div>
        <div className={styles.center}>
          {!leg.walking && (
            <div className={styles.line}>
              <div
                className={`${styles.name} legProduct legProduct-${leg.line.product}`}
              >
                {normalizedLineName(leg.line)}
              </div>
              <PiArrowSquareRightLight size={22} />
              {leg.direction}
            </div>
          )}
          {duration}
          {leg.stopovers.length > 0 &&
            `, ${leg.stopovers.length} stop${
              leg.stopovers.length !== 1 ? 's' : ''
            }`}
        </div>

        <JourneyLegStops leg={leg} />
        <div className={styles.station}>
          <TrainTimeset stop={leg.destination} />
          {leg.destination?.name}
          <span style={{ flex: 1 }} />
          <TrainPlatforms stop={leg.destination} />
        </div>
      </div>
    </div>
  );
};
