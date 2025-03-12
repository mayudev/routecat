export interface DepartureOrArrivalData {
  planned?: string;
  actual?: string;
  plannedPlatform?: string;
  platform?: string;
}

export interface Stopover {
  id?: string;
  name?: string;
  departure: DepartureOrArrivalData;
  arrival: DepartureOrArrivalData;
}

export interface BaseStopData {
  id: string;
  name: string;
  location: Location;
}

export interface StopData extends DepartureOrArrivalData, BaseStopData {}

export interface StationData extends BaseStopData {
  isMeta: boolean;
  type: string;
}

export type Location = Array<number>;
