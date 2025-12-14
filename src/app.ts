import express from 'express';
import { indexRouter } from './routes/index.js';
import { statusRouter } from './routes/status.js';
import { uuidRouter } from './routes/uuid.js';
import { HttpStatusCodes } from './utils/http.js';

const app = express();

app.use('/', indexRouter);
app.use('/status', statusRouter);
app.use('/uuid', uuidRouter);

// 404 handler
app.use((_req, res) => {
  res.status(HttpStatusCodes.NOT_FOUND).json({
    error: {
      message: 'Resource not found',
    },
  });
});

export { app };
