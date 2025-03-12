import { PiMagnifyingGlass } from 'react-icons/pi';
import styles from './JourneySearch.module.css';
import { useState } from 'react';
import { StationData } from 'types';
import { useNavigate } from 'react-router';
import { useMarkerContext } from '../../context/marker';
import { StationInput } from '../molecules/StationInput';
import { TextInput } from '../atoms/TextInput';
import { Button } from '../atoms/Button';
import { JourneyParams } from '../../services/journey';

type Props = {
  compact?: boolean;
};

const date = new Date();
const currentDay = date.toISOString().split('T')[0];
const currentTime = date.toTimeString().slice(0, 5);

export const JourneySearch = ({ compact }: Props) => {
  const { setOriginMarker, setDestinationMarker } = useMarkerContext();
  const navigate = useNavigate();

  const [date, setDate] = useState(currentDay);
  const [time, setTime] = useState(currentTime);

  const [originId, setOriginId] = useState<string>('');
  const [destinationId, setDestinationId] = useState<string>('');

  const onSelectOrigin = (station: StationData) => {
    setOriginId(station.id!);
    setOriginMarker(station.location as [number, number]);
  };

  const onSelectDestination = (station: StationData) => {
    setDestinationId(station.id!);
    setDestinationMarker(station.location as [number, number]);
  };

  const onSearch = () => {
    const params = new URLSearchParams();
    params.set(JourneyParams.origin, originId);
    params.set(JourneyParams.destination, destinationId);
    const sillyISOString = date + 'T' + time;
    const journeyDate = new Date(sillyISOString).toISOString();
    params.set(JourneyParams.journeyDate, journeyDate);

    navigate('/journey?' + params.toString());
  };

  return (
    <div className={styles.layout}>
      {!compact && <div className={styles.headline}>Plan your trip</div>}
      <StationInput onSelect={onSelectOrigin} label="From" />
      <StationInput onSelect={onSelectDestination} label="To" />
      <div className={styles.datePicker}>
        <TextInput label="Day" value={date} onChange={setDate} type="date" />
        <TextInput label="Time" value={time} onChange={setTime} type="time" />
      </div>

      <div className={styles.buttons}>
        {/* <Button icon={PiGear} /> */}
        <Button
          disabled={!originId || !destinationId}
          variant="filled"
          onClick={onSearch}
          fullWidth
          icon={PiMagnifyingGlass}
        >
          Search
        </Button>
      </div>
    </div>
  );
};
