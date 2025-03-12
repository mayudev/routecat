export const mapOrigin = (trip) => trip.origin && {
    id: trip.origin?.id ?? '',
    name: trip.origin?.name ?? '',
    location: [
        trip.origin?.location?.latitude ?? 0,
        trip.origin?.location?.longitude ?? 0,
    ],
    ...mapDeparture(trip),
};
export const mapDestination = (trip) => trip.destination && {
    id: trip.destination?.id ?? '',
    name: trip.destination?.name ?? '',
    location: [
        trip.destination?.location?.latitude ?? 0,
        trip.destination?.location?.longitude ?? 0,
    ],
    ...mapArrival(trip),
};
export const mapArrival = (trip) => ({
    planned: trip.plannedArrival,
    actual: trip.arrival,
    plannedPlatform: trip.plannedArrivalPlatform,
    platform: trip.arrivalPlatform,
});
export const mapDeparture = (trip) => ({
    planned: trip.plannedDeparture,
    actual: trip.departure,
    plannedPlatform: trip.plannedDeparturePlatform,
    platform: trip.departurePlatform,
});
export const mapLine = (line) => ({
    name: line?.name,
    product: line?.product,
});
export const mapStopover = (stopover) => ({
    id: stopover.stop?.id,
    name: stopover.stop?.name,
    arrival: mapArrival(stopover),
    departure: mapDeparture(stopover),
});
