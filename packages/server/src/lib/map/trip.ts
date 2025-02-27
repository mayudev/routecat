import {
  Alternative,
  Journey,
  Leg,
  Line,
  StopOver,
  TripWithRealtimeData,
} from 'hafas-client';
import { Stopover } from '../../types/stop';
import {
  AlternativeTrip,
  FullTrip,
  TransitLine,
  TripWithStopovers,
} from '../../types/trip';
import { mapArrival, mapDeparture, mapDestination, mapOrigin } from './helpers';

export const mapJourneys = (journeys: readonly Journey[]) =>
  journeys.map(journey => ({
    legs: journey.legs.map(mapLeg),
  }));

export const mapLeg = (leg: Leg): TripWithStopovers => ({
  id: leg.tripId ?? '',
  destination: mapDestination(leg),
  origin: mapOrigin(leg),
  line: mapLine(leg.line),
  stopovers: leg.stopovers?.map(mapStopover) ?? [],
  direction: leg.direction,
  walking: leg.walking,
  distance: leg.distance,
});

export const mapAlternative = (alternative: Alternative): AlternativeTrip => ({
  ...mapLeg(alternative),
  planned: alternative.plannedWhen,
  actual: alternative.when,
  provenance: alternative.provenance,
  plannedPlatform: alternative.plannedPlatform,
  platform: alternative.platform,
});

export const mapTrip = (trip: TripWithRealtimeData): FullTrip => ({
  id: trip.trip.id,
  line: mapLine(trip.trip.line),
  origin: mapOrigin(trip.trip),
  destination: mapDestination(trip.trip),
  stopovers: trip.trip.stopovers?.map(mapStopover) ?? [],
  polyline:
    trip.trip.polyline?.features.map(feature => feature.geometry.coordinates) ??
    [],
});

export const mapLine = (line?: Line): TransitLine => ({
  name: line?.name,
  product: line?.product,
});

export const mapStopover = (stopover: StopOver): Stopover => ({
  id: stopover.stop?.id,
  name: stopover.stop?.name,
  arrival: mapArrival(stopover),
  departure: mapDeparture(stopover),
});
