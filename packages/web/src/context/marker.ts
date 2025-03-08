import { LatLngExpression } from 'leaflet';
import { createContext, useContext } from 'react';

export type Bounds = [LatLngExpression, LatLngExpression];
type MarkerContext = {
  markers: LatLngExpression[];
  bounds?: Bounds;
  addMarker: (marker: LatLngExpression) => void;
  setMarkers: (markers: LatLngExpression[]) => void;
  setOriginMarker: (marker: LatLngExpression) => void;
  setDestinationMarker: (marker: LatLngExpression) => void;
};

export const context = createContext<MarkerContext | null>(null);
export const useMarkerContext = (): MarkerContext => useContext(context)!;
