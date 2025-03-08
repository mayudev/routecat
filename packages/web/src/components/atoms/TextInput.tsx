import { ReactNode, useId } from 'react';
import styles from './TextInput.module.css';

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> & {
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
  end?: ReactNode;
};
export const TextInput = ({ label, value, end, onChange, ...props }: Props) => {
  const id = useId();
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          className={styles.input}
          value={value}
          name={id}
          onChange={e => onChange(e.target.value)}
          {...props}
        />
      </div>
      {end}
    </div>
  );
};
