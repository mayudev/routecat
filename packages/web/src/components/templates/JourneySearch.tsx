import { PiMagnifyingGlass } from 'react-icons/pi';
import styles from './JourneySearch.module.css';
import { useCallback, useEffect, useState } from 'react';
import { StationData } from 'types';
import { useNavigate } from 'react-router';
import { useMarkerContext } from '../../context/marker';
import { StationInput } from '../molecules/StationInput';
import { TextInput } from '../atoms/TextInput';
import { Button } from '../atoms/Button';
import { JourneyParams } from '../../services/journey';
import { Suggestion, suggestions } from '../lib/suggestions';
import { TripSuggestion } from '../molecules/TripSuggestion';
import { SearchMode } from '../lib/searchMode';

type Props = {
  compact?: boolean;
};

const date = new Date();
const currentDay = date.toISOString().split('T')[0];
const currentTime = date.toTimeString().slice(0, 5);

export const JourneySearch = ({ compact }: Props) => {
  const { setOriginMarker, setDestinationMarker } = useMarkerContext();
  const navigate = useNavigate();

  const [originSuggestion, setOriginSuggestion] = useState('');
  const [destinationSuggestion, setDestinationSuggestion] = useState('');

  const [date, setDate] = useState(currentDay);
  const [time, setTime] = useState(currentTime);

  const [mode, setMode] = useState<SearchMode>('departure');

  const [originId, setOriginId] = useState<string>('');
  const [destinationId, setDestinationId] = useState<string>('');

  const [compactDisplay, setCompactDisplay] = useState(compact);
  useEffect(() => setCompactDisplay(compact), [compact]);

  const selectSuggestion = (suggestion: Suggestion) => {
    setOriginId(suggestion.origin.stationId);
    setDestinationId(suggestion.destination.stationId);
    setOriginSuggestion(suggestion.origin.stationName);
    setDestinationSuggestion(suggestion.destination.stationName);
  };

  const onSelectOrigin = (station: StationData) => {
    setOriginId(station.id!);
    setOriginMarker(station.location as [number, number]);
  };

  const onSelectDestination = (station: StationData) => {
    setDestinationId(station.id!);
    setDestinationMarker(station.location as [number, number]);
  };

  const onSearch = useCallback(() => {
    setCompactDisplay(true);
    const params = new URLSearchParams();
    params.set(JourneyParams.origin, originId);
    params.set(JourneyParams.destination, destinationId);
    const sillyISOString = date + 'T' + time;
    const journeyDate = new Date(sillyISOString).toISOString();

    if (mode === 'departure') {
      params.set(JourneyParams.departure, journeyDate);
    } else {
      params.set(JourneyParams.arrival, journeyDate);
    }

    navigate('/journey?' + params.toString());
  }, [date, destinationId, navigate, originId, time]);

  // undoCompact gets triggered when a user is interested in interacting with the component. The compact mode gets turned off.
  const undoCompact = useCallback(() => setCompactDisplay(false), []);

  return (
    <div className={styles.layout} onMouseUp={undoCompact}>
      {!compactDisplay && <div className={styles.headline}>Plan your trip</div>}
      <div
        className={`${
          compactDisplay ? styles.compactInputs : styles.regularInputs
        }`}
      >
        <StationInput
          onSelect={onSelectOrigin}
          suggestedValue={originSuggestion}
          label="From"
        />
        <StationInput
          onSelect={onSelectDestination}
          suggestedValue={destinationSuggestion}
          label="To"
        />
      </div>
      <div className={styles.modeButtons}>
        <Button
          variant={mode === 'departure' ? 'filled' : 'tonal'}
          onClick={() => setMode('departure')}
        >
          Departure
        </Button>
        <Button
          variant={mode === 'arrival' ? 'filled' : 'tonal'}
          onClick={() => setMode('arrival')}
        >
          Arrival
        </Button>
      </div>
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
      {!compact && (
        <div className={styles.suggestions}>
          <div className={styles.headline}>Not sure where to go?</div>
          {suggestions.map(suggestion => (
            <TripSuggestion
              suggestion={suggestion}
              onClick={() => selectSuggestion(suggestion)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
