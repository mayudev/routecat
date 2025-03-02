import { useEffect } from 'react';
import { map, tileLayer } from 'leaflet';
import styles from './Map.module.css';
import 'leaflet/dist/leaflet.css';

export const Map = () => {
  useEffect(() => {
    const display = map('map').setView([47.575, 13.326], 8);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(display);

    return () => {
      display.remove();
    };
  }, []);

  return <div className={styles.map} id="map"></div>;
};
