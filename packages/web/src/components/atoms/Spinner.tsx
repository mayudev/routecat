import styles from './Spinner.module.css';

type Props = {
  size?: number;
  borderSize?: number;
  speedMs?: number;
  color?: string;
};
export const Spinner = ({
  size = 32,
  borderSize = 3,
  speedMs,
  color,
}: Props) => {
  return (
    <div
      className={styles.spinner}
      style={{
        width: size,
        height: size,
        borderWidth: borderSize,
        borderColor: color,
        animationDuration: `${speedMs}ms`,
      }}
    ></div>
  );
};
