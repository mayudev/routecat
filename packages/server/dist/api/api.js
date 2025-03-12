import { Router } from 'express';
import { arrivalsHandler, departuresHandler, journeyHandler, stopHandler, tripHandler, } from './handlers';
const api = Router();
api.get('/stops', stopHandler);
api.get('/journey', journeyHandler);
api.post('/trip', tripHandler);
api.get('/arrivals/:stationId', arrivalsHandler);
api.get('/departures/:stationId', departuresHandler);
export default api;
