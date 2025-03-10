import express from 'express';
import api from './api/api';

const app = express();

app.use(express.json());
app.use('/api', api);

const port = process.env.APP_PORT || 8080;
app.listen(port);
console.log(`Running on port ${port}`);
