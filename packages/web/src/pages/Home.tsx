import { Outlet, useLocation } from 'react-router';
import styles from './Home.module.css';
import { JourneySearch } from '../components/templates/JourneySearch';

export const Home = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <JourneySearch compact={pathname !== '/'} />
      <Outlet />
    </div>
  );
};
