import express from 'express';
import { errorRouter } from './routes/error.js';
import { indexRouter } from './routes/index.js';
import { statusRouter } from './routes/status.js';
import { uuidRouter } from './routes/uuid.js';
import { HttpStatusCodes } from './utils/http.js';
import { environment } from './env.js';

const app = express();

app.use('/', indexRouter);
app.use('/error', errorRouter);
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

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error occurred', err);
  const isDevelopment = environment.nodeEnv === 'development';
  const statusCode = isDevelopment
    ? (err as Error & { status?: number }).status || HttpStatusCodes.INTERNAL_SERVER_ERROR
    : HttpStatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    error: {
      message: isDevelopment ? err.stack : 'An unexpected error has occurred.',
    },
  });
});

export { app };
