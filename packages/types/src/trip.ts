import { Location, StopData, Stopover } from './stop';

export interface Trip {
  id: string;
  line: TransitLine;
  origin?: StopData;
  destination?: StopData;
  direction?: string;
  walking?: boolean;
  distance?: number;
}

export interface TripWithStopovers extends Trip {
  stopovers: Stopover[];
}

export interface FullTrip extends TripWithStopovers {
  polyline: Location[];
}

export interface AlternativeTrip extends Trip {
  planned?: string;
  actual?: string;
  plannedPlatform?: string;
  platform?: string;
  provenance?: string;
}

export interface TransitLine {
  name?: string;
  product?: string;
}
