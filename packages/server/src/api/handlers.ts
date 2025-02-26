import { RequestHandler } from 'express';
import client from '../lib/hafas';
import { JourneyQuery, StopQuery, TripBody } from '../types/stops';
import { Stop } from 'hafas-client';
import { mapJourneys, mapLeg, mapTrip } from '../lib/map/trip';

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
    const result = await client.locations(searchQuery, { results: 5 });

    const mappedResult = result.map(entry => ({
      id: entry.id,
      name: entry.name,
      isMeta: (entry as Stop).isMeta ?? false,
      location: (entry as Stop).location,
    }));
    res.send(mappedResult);
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
    const results = await client.journeys(origin, destination, {
      results: 5,
      departure: req.query.date ? new Date(req.query.date) : undefined,
      stopovers: true,
    });

    const mapped = mapJourneys(results.journeys ?? []);

    res.send(mapped);
  } catch (e) {
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
