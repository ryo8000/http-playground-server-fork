import express from 'express';
import { indexRouter } from './routes/index.js';
import { statusRouter } from './routes/status.js';
import { uuidRouter } from './routes/uuid.js';

const app = express();

app.use('/', indexRouter);
app.use('/status', statusRouter);
app.use('/uuid', uuidRouter);

export { app };
