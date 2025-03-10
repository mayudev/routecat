import { StopData } from 'types';
import styles from './TrainPlatforms.module.css';

type Props = {
  stop?: StopData;
};

export const TrainPlatforms = ({ stop }: Props) => {
  const platformChange = stop?.platform !== stop?.plannedPlatform;

  return (
    <div className={styles.platforms}>
      {stop?.platform && <div>Pl. {stop?.platform}</div>}
      {platformChange && (
        <div className={styles.changed}>{stop?.plannedPlatform}</div>
      )}
    </div>
  );
};
