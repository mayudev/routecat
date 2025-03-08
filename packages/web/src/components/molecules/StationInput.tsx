import { FocusEvent, KeyboardEvent, useRef, useState } from 'react';
import { TextInput } from '../atoms/TextInput';
import styles from './StationInput.module.css';
import { useQuery } from '@tanstack/react-query';
import { stopsQueryFn } from '../../services/stops';
import { StationSuggestion } from '../atoms/StationSuggestion';
import { Spinner } from '../atoms/Spinner';
import { StationData } from 'types';

type Props = {
  label: string;
  onSelect: (station: StationData) => void;
};

export const StationInput = ({ label, onSelect }: Props) => {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [activeStationIndex, setActiveStationIndex] = useState(-1);

  const timer = useRef(0);

  const { data, isLoading } = useQuery({
    queryKey: ['stationInput', debouncedValue],
    queryFn: stopsQueryFn({
      search: debouncedValue,
    }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!debouncedValue,
  });

  const onChange = (newValue: string) => {
    setValue(newValue);
    setActiveStationIndex(-1);
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setDebouncedValue(newValue);
    }, 500);
  };

  const select = (index: number) => {
    const value = data?.[index];
    if (!value) return;

    setActiveStationIndex(-1);
    setDebouncedValue('');
    setValue(value.name!);
    onSelect(value);
  };

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (
      e.relatedTarget !== e.currentTarget &&
      !e.currentTarget.contains(e.relatedTarget)
    )
      setDebouncedValue('');
  };
  const onFocus = () => setDebouncedValue(value);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!data) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      if (activeStationIndex + 1 === data.length) {
        setActiveStationIndex(0);
      } else {
        setActiveStationIndex(activeStationIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();

      if (activeStationIndex === 0) {
        setActiveStationIndex(data.length - 1);
      } else {
        setActiveStationIndex(activeStationIndex - 1);
      }
    } else if (e.key === 'Enter') {
      select(activeStationIndex);
    }
  };

  return (
    <div
      className={styles.container}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
    >
      <TextInput
        label={label}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        end={isLoading && <Spinner size={24} borderSize={2} />}
      />
      <div className={styles.dropdown}>
        {data?.map((station, i) => (
          <StationSuggestion
            active={activeStationIndex === i}
            station={station}
            key={station.id}
            onSelect={() => select(i)}
          />
        ))}
      </div>
    </div>
  );
};
