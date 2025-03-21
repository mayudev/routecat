import { Location, StopData, Stopover } from './stop';

export interface MetaJourneys {
  journeys: Journey[];
  earlierRef?: string;
  laterRef?: string;
}

export interface Journey {
  legs: TripWithStopovers[];
}

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
  product?: Product;
}

export type Product =
  | 'nationalExpress'
  | 'national'
  | 'interregional'
  | 'regional'
  | 'suburban'
  | 'bus'
  | 'ferry'
  | 'subway'
  | 'tram'
  | 'onCall'
  | undefined;
