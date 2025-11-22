import request from 'supertest';
import { app } from '../../../src/app.js';

describe('Root endpoint /', () => {

  const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'] as const;

  describe.each(httpMethods)('%s method', (method) => {
    it('should respond with status 200', async () => {
      const response = await request(app)[method]('/');

      expect(response.status).toBe(200);
    });
  });
});
