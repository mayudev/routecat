"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrivalsHandler = exports.departuresHandler = exports.tripHandler = exports.journeyHandler = exports.stopHandler = void 0;
const hafas_1 = __importDefault(require("../lib/hafas"));
const stop_1 = require("../lib/map/stop");
const trip_1 = require("../lib/map/trip");
const date_1 = require("../lib/date");
const stopHandler = async (req, res) => {
    const searchQuery = req.query.search;
    if (!searchQuery) {
        res.status(400).send();
        return;
    }
    try {
        const result = await hafas_1.default.locations(searchQuery, {
            results: 5,
        });
        const mapped = result
            .filter(stop_1.filterStation)
            .map(station => (0, stop_1.mapStation)(station));
        res.send(mapped);
    }
    catch (e) {
        res.sendStatus(500);
    }
    return;
};
exports.stopHandler = stopHandler;
const journeyHandler = async (req, res) => {
    const origin = req.query.origin;
    const destination = req.query.dest;
    if (!origin || !destination) {
        res.status(400).send();
        return;
    }
    try {
        const dateSpecifiers = req.query.departure
            ? { departure: new Date(req.query.departure) }
            : req.query.arrival
                ? { arrival: new Date(req.query.arrival) }
                : {};
        const results = await hafas_1.default.journeys(origin, destination, {
            results: 15,
            stopovers: true,
            ...dateSpecifiers,
        });
        const mapped = (0, trip_1.mapJourneys)(results.journeys ?? []);
        res.send(mapped);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
    return;
};
exports.journeyHandler = journeyHandler;
const tripHandler = async (req, res) => {
    if (!req.body.tripId) {
        res.status(400).send();
        return;
    }
    try {
        const trip = await hafas_1.default.trip(req.body.tripId, { polyline: true });
        const mapped = (0, trip_1.mapTrip)(trip);
        res.send(mapped);
    }
    catch (e) {
        res.sendStatus(500);
    }
    return;
};
exports.tripHandler = tripHandler;
const departuresHandler = async (req, res) => {
    try {
        const trips = await hafas_1.default.departures(req.params.stationId, {
            results: 10,
            ...(0, date_1.parseStationWhen)(req.query),
        });
        const mapped = trips.departures.map(departure => (0, trip_1.mapAlternative)(departure));
        res.send(mapped);
    }
    catch (e) {
        res.sendStatus(500);
    }
};
exports.departuresHandler = departuresHandler;
const arrivalsHandler = async (req, res) => {
    try {
        const trips = await hafas_1.default.arrivals(req.params.stationId, {
            results: 10,
            ...(0, date_1.parseStationWhen)(req.query),
        });
        const mapped = trips.arrivals.map(arrival => (0, trip_1.mapAlternative)(arrival));
        res.send(mapped);
    }
    catch (e) {
        res.sendStatus(500);
    }
};
exports.arrivalsHandler = arrivalsHandler;
