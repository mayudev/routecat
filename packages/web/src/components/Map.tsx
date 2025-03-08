import { useEffect, useRef } from 'react';
import {
  LatLngBounds,
  LatLngExpression,
  Map as LeafletMap,
  map,
  Marker,
  marker,
  tileLayer,
} from 'leaflet';
import styles from './Map.module.css';
import 'leaflet/dist/leaflet.css';
import { Bounds } from '../context/marker';

type Props = {
  markers: LatLngExpression[];
  bounds?: Bounds;
};

export const Map = ({ markers, bounds }: Props) => {
  const mapRef = useRef<LeafletMap | undefined>(undefined);

  useEffect(() => {
    mapRef.current = map('map').setView([47.575, 13.326], 8);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const currentMarkers: Marker[] = [];

    markers.forEach(latlng => {
      const item = marker(latlng);
      item.addTo(mapRef.current!);
      currentMarkers.push(item);
    });

    return () => {
      currentMarkers.forEach(marker => marker.remove());
    };
  }, [markers]);

  useEffect(() => {
    if (bounds && mapRef.current) {
      mapRef.current.fitBounds(new LatLngBounds(bounds[0], bounds[1]));
    }
  }, [bounds]);

  return <div className={styles.map} id="map"></div>;
};
