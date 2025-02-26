export interface Stopover {
  id?: string;
  name?: string;
  departure: DepartureOrArrivalData;
  arrival: DepartureOrArrivalData;
}

export interface DepartureOrArrivalData {
  planned?: string;
  actual?: string;
  plannedPlatform?: string;
  platform?: string;
}

export interface StopData extends DepartureOrArrivalData {
  id?: string;
  name?: string;
  location: Location;
}

export type Location = Array<number>;
