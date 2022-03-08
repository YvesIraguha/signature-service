import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../index';

chai.use(chaiHttp);

describe('/', () => {
  it('should return default message', async () => {
    const response = await chai.request(app).get('/');
    expect(response.body.message).to.equal('Welcome to Rutsiro Library');
    expect(response.status).to.equal(200);
  });
});
