import { TripWithStopovers } from 'types';
import styles from './JourneyLegStops.module.css';

type Props = {
  leg: TripWithStopovers;
};
// eslint-disable-next-line no-empty-pattern
export const JourneyLegStops = ({}: Props) => {
  return <div className={styles.stopovers}></div>;
};
