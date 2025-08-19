import express from 'express';
import request from 'supertest';
import { errorRouter } from '../../../src/routes/error.js';

const app = express();
app.use('/error', errorRouter);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(500).json({ message: err.message });
});

describe('errorRouter', () => {
  const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'] as const;

  describe.each(httpMethods)('%s method', (method) => {
    // Network disconnection and timeout are difficult to test in unit tests, so we do minimal verification
    it('should cause connection reset for "network" type', async () => {
      const response = await request(app)
        [method]('/error/network')
        .catch((err) => err);
      expect(response.message).toMatch(/socket hang up|ECONNRESET/);
    });

    it('should timeout for "timeout" type', async () => {
      const timeoutMs = 1000;
      const response = await request(app)
        [method]('/error/timeout')
        .timeout({ deadline: timeoutMs })
        .catch((err) => err);
      expect(response.timeout).toBeTruthy();
    });

    it('should return malformed JSON for "malformed-json" type', async () => {
      const response = await request(app)
        [method]('/error/malformed-json')
        .catch((err) => {
          if (method !== 'head') {
            expect(err.message).toContain('Expected double-quoted property name in JSON');
          }
        });
      if (method === 'head' && !!response) {
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch(/application\/json/);
      }
    });

    it('should return 500 for "error" type', async () => {
      const response = await request(app)[method]('/error/error');
      expect(response.status).toBe(500);
      if (method !== 'head') {
        expect(response.body).toEqual({ message: 'Intentional error' });
      }
    });
  });
});
