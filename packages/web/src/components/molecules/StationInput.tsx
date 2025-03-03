import { useState } from 'react';
import { TextInput } from '../atoms/TextInput';

type Props = {
  label: string;
};

export const StationInput = ({ label }: Props) => {
  const [value, setValue] = useState('');

  return <TextInput label={label} value={value} onChange={setValue} />;
};
