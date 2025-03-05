import { useState } from 'react';
import { TextInput } from '../atoms/TextInput';
import styles from './StationInput.module.css';

type Props = {
  label: string;
};

export const StationInput = ({ label }: Props) => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextInput label={label} value={value} onChange={setValue} />
      <div className={styles.dropdown}>bwaa</div>
    </div>
  );
};
