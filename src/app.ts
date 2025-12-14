import express from 'express';
import { indexRouter } from './routes/index.js';
import { statusRouter } from './routes/status.js';

const app = express();

app.use('/', indexRouter);
app.use('/status', statusRouter);

export { app };
