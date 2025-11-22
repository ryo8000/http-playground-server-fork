import { Router } from 'express';
import { HttpStatusCodes } from '../utils/http.js';

const rootRouter = Router();

rootRouter.all('/', (_req, res) => {
  res.sendStatus(HttpStatusCodes.OK);
});

export { rootRouter };
