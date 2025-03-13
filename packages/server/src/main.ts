import express from 'express';
import api from './api/api';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: process.env.APP_CORS_ORIGIN || 'http://localhost',
  })
);

app.use(express.json());
app.use('/api', api);

const port = process.env.APP_PORT || 8080;
app.listen(port);
console.log(`Running on port ${port}`);
