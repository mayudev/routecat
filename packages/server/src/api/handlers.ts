import { RequestHandler } from 'express';
import { Station } from 'hafas-client';
import client from '../lib/hafas';
import { filterStation, mapStation } from '../lib/map/stop';
import { mapAlternative, mapJourneys, mapTrip } from '../lib/map/trip';
import {
  JourneyQuery,
  StationParams,
  StationQuery,
  StopQuery,
  TripBody,
} from '../types/handlers';
import { parseStationWhen } from '../lib/date';

export const stopHandler: RequestHandler<{}, {}, {}, StopQuery> = async (
  req,
  res
) => {
  const searchQuery = req.query.search;

  if (!searchQuery) {
    res.status(400).send();
    return;
  }

  try {
    const result = await client.locations(searchQuery, {
      results: 5,
    });
    const mapped = result
      .filter(filterStation)
      .map(station => mapStation(station as Station));
    res.send(mapped);
  } catch (e) {
    res.sendStatus(500);
  }
  return;
};

export const journeyHandler: RequestHandler<{}, {}, {}, JourneyQuery> = async (
  req,
  res
) => {
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

    const results = await client.journeys(origin, destination, {
      results: 15,
      stopovers: true,
      ...dateSpecifiers,
    });

    const mapped = mapJourneys(results.journeys ?? []);
    res.send(mapped);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
  return;
};

export const tripHandler: RequestHandler<{}, {}, TripBody, {}> = async (
  req,
  res
) => {
  if (!req.body.tripId) {
    res.status(400).send();
    return;
  }

  try {
    const trip = await client.trip!(req.body.tripId, { polyline: true });
    const mapped = mapTrip(trip);

    res.send(mapped);
  } catch (e) {
    res.sendStatus(500);
  }

  return;
};

export const departuresHandler: RequestHandler<
  StationParams,
  {},
  {},
  StationQuery
> = async (req, res) => {
  try {
    const trips = await client.departures(req.params.stationId, {
      results: 10,
      ...parseStationWhen(req.query),
    });
    const mapped = trips.departures.map(departure => mapAlternative(departure));
    res.send(mapped);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const arrivalsHandler: RequestHandler<
  StationParams,
  {},
  {},
  StationQuery
> = async (req, res) => {
  try {
    const trips = await client.arrivals(req.params.stationId, {
      results: 10,
      ...parseStationWhen(req.query),
    });
    const mapped = trips.arrivals.map(arrival => mapAlternative(arrival));
    res.send(mapped);
  } catch (e) {
    res.sendStatus(500);
  }
};
