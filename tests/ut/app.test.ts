import request from 'supertest';
import { app } from '../../src/app.js';

describe('App', () => {
  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/non-existent-route');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: {
          message: 'Resource not found',
        },
      });
    });
  });
});
