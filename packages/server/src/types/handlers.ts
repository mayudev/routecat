export interface StopQuery {
  search: string;
}

export interface JourneyQuery {
  origin: string;
  dest: string;
  departure?: string;
  arrival?: string;
}

export interface TripBody {
  tripId: string;
}

export interface StationParams {
  stationId: string;
}

export interface StationQuery {
  when?: string;
}
