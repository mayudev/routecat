import { LatLngExpression } from 'leaflet';
import { PropsWithChildren, useState } from 'react';
import { Bounds, context } from './marker';

export const MarkerContext = ({ children }: PropsWithChildren<unknown>) => {
  const [internalMarkers, setMarkers] = useState<LatLngExpression[]>([]);
  const [originMarker, setOrigin] = useState<LatLngExpression | null>(null);
  const [destinationMarker, setDestination] = useState<LatLngExpression | null>(
    null
  );
  const [bounds, setBounds] = useState<Bounds | undefined>();

  const addMarker = (marker: LatLngExpression) => {
    setMarkers(current => [...current, marker]);
  };

  const setOriginMarker = (marker: LatLngExpression) => {
    setOrigin(marker);

    if (destinationMarker) {
      setBounds([marker, destinationMarker]);
    }
  };

  const setDestinationMarker = (marker: LatLngExpression) => {
    setDestination(marker);

    if (originMarker) {
      setBounds([marker, originMarker]);
    }
  };

  const markers = [originMarker, destinationMarker, ...internalMarkers].filter(
    val => val !== null
  );

  return (
    <context.Provider
      value={{
        markers,
        bounds,
        addMarker,
        setMarkers,
        setDestinationMarker,
        setOriginMarker,
      }}
    >
      {children}
    </context.Provider>
  );
};
