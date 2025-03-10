import { TripWithStopovers } from 'types';
import styles from './JourneyLegStops.module.css';

type Props = {
  leg: TripWithStopovers;
};
export const JourneyLegStops = ({ leg }: Props) => {
  return <div className={styles.stopovers}>{leg.stopovers.length}</div>;
};
