import styles from './TextInput.module.css';

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> & {
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
};
export const TextInput = ({ label, value, onChange, ...props }: Props) => {
  return (
    <div className={styles.inputContainer}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
};
