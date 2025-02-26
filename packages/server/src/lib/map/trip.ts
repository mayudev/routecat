import {
  Journey,
  Leg,
  Line,
  StopOver,
  TripWithRealtimeData,
} from 'hafas-client';
import { Stopover } from '../../types/stop';
import { FullTrip, LegTrip, TransitLine } from '../../types/trip';
import { mapArrival, mapDeparture, mapDestination, mapOrigin } from './helpers';

export const mapJourneys = (journeys: readonly Journey[]) =>
  journeys.map(journey => ({
    legs: journey.legs.map(mapLeg),
  }));

export const mapLeg = (leg: Leg): LegTrip => ({
  id: leg.tripId ?? '',
  destination: mapDestination(leg),
  origin: mapOrigin(leg),
  line: mapLine(leg.line),
  stopovers: leg.stopovers?.map(mapStopover) ?? [],
  direction: leg.direction,
  walking: leg.walking,
  distance: leg.distance,
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
  mode: line?.mode,
});

export const mapStopover = (stopover: StopOver): Stopover => ({
  id: stopover.stop?.id,
  name: stopover.stop?.name,
  arrival: mapArrival(stopover),
  departure: mapDeparture(stopover),
});
