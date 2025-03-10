import { TripWithStopovers } from 'types';
import styles from './JourneyVisualization.module.css';
import { normalizedLineName } from '../lib/line';
import { PiPersonSimpleWalk } from 'react-icons/pi';

type Props = {
  legs: TripWithStopovers[];
};
export const JourneyVisualization = ({ legs }: Props) => {
  return (
    <div className={styles.legs}>
      {legs.map(leg =>
        leg.walking ? (
          leg.distance && <PiPersonSimpleWalk />
        ) : (
          <div
            className={`${styles.leg} legProduct legProduct-${leg.line.product}`}
            key={leg.id}
          >
            {normalizedLineName(leg.line)}
          </div>
        )
      )}
    </div>
  );
};
