"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAlternative = exports.mapTrip = exports.mapTripWithStopovers = exports.mapJourneys = void 0;
const helpers_1 = require("./helpers");
const mapJourneys = (journeys) => journeys.map(journey => ({
    legs: journey.legs.map(exports.mapTripWithStopovers),
}));
exports.mapJourneys = mapJourneys;
// mapTripBasic is an internal method to map basic properties of the Trip type.
const mapTripBasic = (trip) => ({
    id: trip.tripId ?? '',
    destination: (0, helpers_1.mapDestination)(trip),
    origin: (0, helpers_1.mapOrigin)(trip),
    line: (0, helpers_1.mapLine)(trip.line),
    direction: trip.direction,
    walking: trip.walking,
    distance: trip.distance,
});
// mapTripWithStopovers maps a basic trip + stopovers.
const mapTripWithStopovers = (leg) => ({
    ...mapTripBasic(leg),
    stopovers: leg.stopovers?.map(helpers_1.mapStopover) ?? [],
});
exports.mapTripWithStopovers = mapTripWithStopovers;
// mapTrip maps a full trip (basic + stopovers + polyline)
const mapTrip = (trip) => ({
    ...(0, exports.mapTripWithStopovers)(trip.trip),
    polyline: trip.trip.polyline?.features.map(feature => feature.geometry.coordinates) ??
        [],
});
exports.mapTrip = mapTrip;
// mapAlternative maps a trip as an entry in arrivals or departures.
const mapAlternative = (alternative) => ({
    ...mapTripBasic(alternative),
    planned: alternative.plannedWhen,
    actual: alternative.when,
    provenance: alternative.provenance,
    plannedPlatform: alternative.plannedPlatform,
    platform: alternative.platform,
});
exports.mapAlternative = mapAlternative;
