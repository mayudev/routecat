import { PiTrain } from 'react-icons/pi';
import { NavLink } from '../atoms/NavLink';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <NavLink icon={PiTrain} to="/">
          Journey
        </NavLink>
      </nav>
    </header>
  );
};
