import { PiHouseSimple, PiTrain } from 'react-icons/pi';
import { NavLink } from './controls/NavLink';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <NavLink icon={PiTrain} to="/">
          Journey
        </NavLink>
        <NavLink icon={PiHouseSimple} to="/station">
          Stations
        </NavLink>
      </nav>
    </header>
  );
};
