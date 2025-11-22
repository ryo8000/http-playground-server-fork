import express from 'express';
import request from 'supertest';
import { rootRouter } from '../../../src/routes/root.js';

const app = express();
app.use('/', rootRouter);

describe('rootRouter', () => {
  const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'] as const;

  describe.each(httpMethods)('%s method', (method) => {
    it('should respond with status 200', async () => {
      const response = await request(app)[method]('/');

      expect(response.status).toBe(200);
    });
  });
});
