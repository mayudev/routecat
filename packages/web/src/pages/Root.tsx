import { Outlet } from 'react-router';
import { Map } from '../components/Map';
import styles from './Root.module.css';
import { Header } from '../components/organisms/Header';
import { useMarkerContext } from '../context/marker';

export const Root = () => {
  const { markers, bounds } = useMarkerContext();

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <Header />
        <Outlet />
      </div>
      <Map markers={markers} bounds={bounds} />
    </div>
  );
};
