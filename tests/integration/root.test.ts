import request from 'supertest';
import app from '../../app';

describe('/', () => {
  it('should return default message', async () => {
    const response = await request(app).get('/');
    expect(response.body.message).toEqual('Welcome to signature service API');
    expect(response.status).toEqual(200);
  });
});
