import express from 'express';
import cookieParser from 'cookie-parser';
import { errorRouter } from './routes/error.js';
import { indexRouter } from './routes/index.js';
import { requestRouter } from './routes/request.js';
import { statusRouter } from './routes/status.js';
import { uuidRouter } from './routes/uuid.js';
import { HttpStatusCodes } from './utils/http.js';
import { environment } from './env.js';
import { log } from './logger.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/error', errorRouter);
app.use('/request', requestRouter);
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
  log.error({ err }, 'Unhandled error occurred');
  const isDevelopment = environment.nodeEnv === 'development';

  res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      message: isDevelopment ? err.stack : 'An unexpected error has occurred.',
    },
  });
});

export { app };
