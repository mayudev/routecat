import { Outlet } from 'react-router';
import styles from './Home.module.css';
import { JourneySearch } from '../components/templates/JourneySearch';

export const Home = () => {
  return (
    <div className={styles.container}>
      <JourneySearch />
      <Outlet />
    </div>
  );
};
