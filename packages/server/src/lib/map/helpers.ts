import { Line, Stop, StopOver } from 'hafas-client';
import {
  TypeWithArrivalData,
  TypeWithDepartureData,
  TypeWithTripData,
} from '../../types/hafas/stop';
import {
  DepartureOrArrivalData,
  Product,
  StopData,
  Stopover,
  TransitLine,
} from 'types';

export const mapOrigin = (trip: TypeWithTripData): StopData | undefined =>
  trip.origin && {
    id: trip.origin?.id,
    name: trip.origin?.name,
    location: [
      (trip.origin as Stop)?.location?.latitude ?? 0,
      (trip.origin as Stop)?.location?.longitude ?? 0,
    ],
    ...mapDeparture(trip),
  };

export const mapDestination = (trip: TypeWithTripData): StopData | undefined =>
  trip.destination && {
    id: trip.destination?.id,
    name: trip.destination?.name,
    location: [
      (trip.destination as Stop)?.location?.latitude ?? 0,
      (trip.destination as Stop)?.location?.longitude ?? 0,
    ],
    ...mapArrival(trip),
  };

export const mapArrival = (
  trip: TypeWithArrivalData
): DepartureOrArrivalData => ({
  planned: trip.plannedArrival,
  actual: trip.arrival,
  plannedPlatform: trip.plannedArrivalPlatform,
  platform: trip.arrivalPlatform,
});

export const mapDeparture = (
  trip: TypeWithDepartureData
): DepartureOrArrivalData => ({
  planned: trip.plannedDeparture,
  actual: trip.departure,
  plannedPlatform: trip.plannedDeparturePlatform,
  platform: trip.departurePlatform,
});

export const mapLine = (line?: Line): TransitLine => ({
  name: line?.name,
  product: line?.product as Product | undefined,
});

export const mapStopover = (stopover: StopOver): Stopover => ({
  id: stopover.stop?.id,
  name: stopover.stop?.name,
  arrival: mapArrival(stopover),
  departure: mapDeparture(stopover),
});
