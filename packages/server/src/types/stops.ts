export interface StopQuery {
  search: string;
}

export interface JourneyQuery {
  origin: string;
  dest: string;
  date?: string;
}

export interface TripBody {
  tripId: string;
}
