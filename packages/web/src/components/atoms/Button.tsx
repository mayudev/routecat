import { PropsWithChildren } from 'react';
import styles from './Button.module.css';
import { IconType } from 'react-icons';

type Props = {
  icon?: IconType;
  variant?: 'filled' | 'tonal' | 'outlined';
  fullWidth?: boolean;
};

export const Button = ({
  children,
  icon,
  variant = 'tonal',
  fullWidth,
}: PropsWithChildren<Props>) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${
        fullWidth && styles.fullWidth
      }`}
    >
      {icon && icon({ size: 20 })}
      {children}
    </button>
  );
};
