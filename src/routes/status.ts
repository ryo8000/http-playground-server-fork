import { Router } from 'express';
import { HttpStatusCodes } from '../utils/http.js';
import { toSafeInteger } from '../utils/number.js';

const statusRouter = Router();

statusRouter.all('/:status', (req, res) => {
  const statusCode = toSafeInteger(req.params.status);
  const isValidStatusCode = statusCode !== undefined && statusCode >= 200 && statusCode <= 599;

  if (!isValidStatusCode) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      error: {
        message: 'Invalid status',
      },
    });
    return;
  }

  res.sendStatus(statusCode);
});

export { statusRouter };
