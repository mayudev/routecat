import { Location, Station, Stop } from 'hafas-client';
import { StationData } from 'types';

export const filterStation = (station: Stop | Station | Location): boolean =>
  !!(
    station.id &&
    station.name &&
    (station as Station).location &&
    (station as Station).location!.latitude &&
    (station as Station).location!.longitude
  );
export const mapStation = (station: Stop | Station): StationData => ({
  id: station.id!,
  name: station.name!,
  location: [station.location!.latitude!, station.location!.longitude!],
  isMeta: station.isMeta ?? false,
  type: station.type,
});
