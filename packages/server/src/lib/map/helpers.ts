import { Trip as HafasTrip, Stop } from 'hafas-client';
import {
  TypeWithArrivalData,
  TypeWithDepartureData,
  TypeWithTripData,
} from '../../types/hafas/stop';
import { DepartureOrArrivalData, StopData } from '../../types/stop';

export const mapOrigin = (trip: TypeWithTripData): StopData => ({
  id: trip.origin?.id,
  name: trip.origin?.name,
  location: [
    (trip.origin as Stop).location?.latitude ?? 0,
    (trip.origin as Stop).location?.longitude ?? 0,
  ],
  ...mapDeparture(trip),
});

export const mapDestination = (trip: TypeWithTripData): StopData => ({
  id: trip.destination?.id,
  name: trip.destination?.name,
  location: [
    (trip.origin as Stop).location?.latitude ?? 0,
    (trip.origin as Stop).location?.longitude ?? 0,
  ],
  ...mapArrival(trip),
});

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
