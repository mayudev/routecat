import { Router } from 'express';
import { journeyHandler, stopHandler, tripHandler } from './handlers';

const api = Router();

api.get('/stops', stopHandler);
api.get('/journey', journeyHandler);
api.post('/trip', tripHandler);
export default api;
