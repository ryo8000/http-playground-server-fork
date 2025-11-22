import express from 'express';
import { rootRouter } from './routes/root.js';

const app = express();

app.use('/', rootRouter);

export { app };
