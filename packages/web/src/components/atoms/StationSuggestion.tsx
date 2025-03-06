import { PiMapPin, PiTrain } from 'react-icons/pi';
import styles from './StationSuggestion.module.css';
import { StationData } from 'types';

type Props = {
  station: StationData;
  active: boolean;
  onSelect: () => void;
};

export const StationSuggestion = ({ station, active, onSelect }: Props) => {
  const entryIcon = () => {
    if (station.type === 'stop') return <PiTrain />;
    else return <PiMapPin />;
  };

  return (
    <div
      className={`${styles.station} ${active && styles.active}`}
      onClick={onSelect}
    >
      <div className={styles.icon}>{entryIcon()}</div>
      <div className="name">{station.name}</div>
    </div>
  );
};
