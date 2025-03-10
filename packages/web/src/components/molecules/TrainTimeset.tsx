import { StopData } from 'types';
import styles from './TrainTimeset.module.css';
import dayjs from 'dayjs';

type Props = {
  stop?: StopData;
};

const hhmm = 'HH:mm';

export const TrainTimeset = ({ stop }: Props) => {
  const planned = dayjs(stop?.planned);
  const actual = dayjs(stop?.actual);

  const delayMinutes = actual.diff(planned, 'minutes');

  return (
    <div className={styles.timeset}>
      <div className={styles.planned}>{planned.format(hhmm)}</div>
      <div
        className={`${styles.actual} ${
          delayMinutes > 5 ? styles.delayed : styles.ontime
        }`}
      >
        {actual.format(hhmm)}
      </div>
    </div>
  );
};
