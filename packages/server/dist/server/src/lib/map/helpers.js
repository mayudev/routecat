"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapStopover = exports.mapLine = exports.mapDeparture = exports.mapArrival = exports.mapDestination = exports.mapOrigin = void 0;
const mapOrigin = (trip) => trip.origin && {
    id: trip.origin?.id ?? '',
    name: trip.origin?.name ?? '',
    location: [
        trip.origin?.location?.latitude ?? 0,
        trip.origin?.location?.longitude ?? 0,
    ],
    ...(0, exports.mapDeparture)(trip),
};
exports.mapOrigin = mapOrigin;
const mapDestination = (trip) => trip.destination && {
    id: trip.destination?.id ?? '',
    name: trip.destination?.name ?? '',
    location: [
        trip.destination?.location?.latitude ?? 0,
        trip.destination?.location?.longitude ?? 0,
    ],
    ...(0, exports.mapArrival)(trip),
};
exports.mapDestination = mapDestination;
const mapArrival = (trip) => ({
    planned: trip.plannedArrival,
    actual: trip.arrival,
    plannedPlatform: trip.plannedArrivalPlatform,
    platform: trip.arrivalPlatform,
});
exports.mapArrival = mapArrival;
const mapDeparture = (trip) => ({
    planned: trip.plannedDeparture,
    actual: trip.departure,
    plannedPlatform: trip.plannedDeparturePlatform,
    platform: trip.departurePlatform,
});
exports.mapDeparture = mapDeparture;
const mapLine = (line) => ({
    name: line?.name,
    product: line?.product,
});
exports.mapLine = mapLine;
const mapStopover = (stopover) => ({
    id: stopover.stop?.id,
    name: stopover.stop?.name,
    arrival: (0, exports.mapArrival)(stopover),
    departure: (0, exports.mapDeparture)(stopover),
});
exports.mapStopover = mapStopover;
