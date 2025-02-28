import { Alternative, Journey, Leg, TripWithRealtimeData } from 'hafas-client';
import {
  AlternativeTrip,
  FullTrip,
  Trip,
  TripWithStopovers,
} from '../../types/trip';
import { mapDestination, mapLine, mapOrigin, mapStopover } from './helpers';

export const mapJourneys = (journeys: readonly Journey[]) =>
  journeys.map(journey => ({
    legs: journey.legs.map(mapTripWithStopovers),
  }));

// mapTripBasic is an internal method to map basic properties of the Trip type.
const mapTripBasic = (trip: Leg): Trip => ({
  id: trip.tripId ?? '',
  destination: mapDestination(trip),
  origin: mapOrigin(trip),
  line: mapLine(trip.line),
  direction: trip.direction,
  walking: trip.walking,
  distance: trip.distance,
});

// mapTripWithStopovers maps a basic trip + stopovers.
export const mapTripWithStopovers = (leg: Leg): TripWithStopovers => ({
  ...mapTripBasic(leg),
  stopovers: leg.stopovers?.map(mapStopover) ?? [],
});

// mapTrip maps a full trip (basic + stopovers + polyline)
export const mapTrip = (trip: TripWithRealtimeData): FullTrip => ({
  ...mapTripWithStopovers(trip.trip),
  polyline:
    trip.trip.polyline?.features.map(feature => feature.geometry.coordinates) ??
    [],
});

// mapAlternative maps a trip as an entry in arrivals or departures.
export const mapAlternative = (alternative: Alternative): AlternativeTrip => ({
  ...mapTripBasic(alternative),
  planned: alternative.plannedWhen,
  actual: alternative.when,
  provenance: alternative.provenance,
  plannedPlatform: alternative.plannedPlatform,
  platform: alternative.platform,
});
