"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapStation = exports.filterStation = void 0;
const filterStation = (station) => !!(station.id &&
    station.name &&
    station.location &&
    station.location.latitude &&
    station.location.longitude);
exports.filterStation = filterStation;
const mapStation = (station) => ({
    id: station.id,
    name: station.name,
    location: [station.location.latitude, station.location.longitude],
    isMeta: station.isMeta ?? false,
    type: station.type,
});
exports.mapStation = mapStation;
