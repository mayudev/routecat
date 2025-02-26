import { DepartureOrArrivalData, Location, StopData, Stopover } from './stop';

interface Trip {
  id: string;
  line: TransitLine;
  origin: StopData;
  destination: StopData;
  stopovers: Stopover[];
}

export interface FullTrip extends Trip {
  polyline: Location[];
}

export interface LegTrip extends Trip {
  direction?: string;
  walking?: boolean;
  distance?: number;
}

export interface TransitLine {
  name?: string;
  mode?: string;
}
