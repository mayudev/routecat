import { Location, Station, Stop } from 'hafas-client';

export interface TypeWithTripData
  extends TypeWithArrivalData,
    TypeWithDepartureData {
  origin?: Station | Stop | Location;
  destination?: Station | Stop | Location;
}

export interface TypeWithArrivalData {
  arrival?: string;
  arrivalDelay?: number;
  prognosedArrival?: string;
  plannedArrival?: string;
  arrivalPlatform?: string;
  prognosedArrivalPlatform?: string;
  plannedArrivalPlatform?: string;
}

export interface TypeWithDepartureData {
  departure?: string;
  departureDelay?: number;
  prognosedDeparture?: string;
  plannedDeparture?: string;
  departurePlatform?: string;
  prognosedDeparturePlatform?: string;
  plannedDeparturePlatform?: string;
}
