import express from 'express';
import { indexRouter } from './routes/index.js';

const app = express();

app.use('/', indexRouter);

export { app };
