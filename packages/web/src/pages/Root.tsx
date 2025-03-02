import { Outlet } from 'react-router';
import { Map } from '../components/Map';
import styles from './Root.module.css';
import { Header } from '../components/Header';

export const Root = () => {
  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <Header />
        <Outlet />
      </div>
      <Map />
    </div>
  );
};
