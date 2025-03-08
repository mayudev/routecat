import { PropsWithChildren } from 'react';
import styles from './Button.module.css';
import { IconType } from 'react-icons';

type Props = {
  icon?: IconType;
  variant?: 'filled' | 'tonal' | 'outlined';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
};

export const Button = ({
  children,
  icon,
  disabled,
  variant = 'tonal',
  onClick,
  fullWidth,
}: PropsWithChildren<Props>) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${
        fullWidth && styles.fullWidth
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && icon({ size: 20 })}
      {children}
    </button>
  );
};
