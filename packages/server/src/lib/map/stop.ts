import { Station, Stop } from 'hafas-client';
import { StationData } from 'types';

export const mapStation = (station: Stop | Station): StationData => ({
  id: station.id,
  name: station.name,
  location: [station.location?.latitude ?? 0, station.location?.longitude ?? 0],
  isMeta: station.isMeta ?? false,
  type: station.type,
});
