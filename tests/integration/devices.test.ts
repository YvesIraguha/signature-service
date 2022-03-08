import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import models from '../../models';
import { app } from '../../index';

chai.use(chaiHttp);

const Devices = models.Devices;

describe('/devices', () => {
  beforeEach(() => {
    const findAllStub = sinon.stub(Devices, 'findAll');
    const findByPkStub = sinon.stub(Devices, 'findByPk');
    const createStub = sinon.stub(Devices, 'create');
    const deleteStub = sinon.stub(Devices, 'destroy');

    findAllStub.returns([
      { publicKey: 'publicKey', description: 'description' }
    ]);
    findByPkStub.returns({
      publicKey: 'publicKey',
      description: 'description',
      id: '1'
    });
    createStub.returns({
      publicKey: 'publicKey',
      description: 'description',
      id: '2'
    });
    deleteStub.returns(['1']);
  });

  afterEach(() => {
    sinon.restore();
  });
  it('should return a list of all Devices', async () => {
    const response = await chai.request(app).get('/devices');
    expect(response.body.data).to.deep.equal([
      { publicKey: 'publicKey', description: 'description' }
    ]);
    expect(response.status).to.equal(200);
  });
  it('should return one book', async () => {
    const response = await chai.request(app).get('/devices/1');
    expect(response.body.data).to.deep.equal({
      publicKey: 'publicKey',
      description: 'description',
      id: '1'
    });
    expect(response.status).to.equal(200);
  });
  it('should record a book', async () => {
    const response = await chai
      .request(app)
      .post('/devices')
      .send({ publicKey: 'publicKey', description: 'description' });
    expect(response.body.data).to.deep.equal({
      publicKey: 'publicKey',
      description: 'description',
      id: '2'
    });
    expect(response.status).to.equal(201);
  });

  it('should delete a book', async () => {
    const response = await chai.request(app).delete('/devices/2');
    expect(response.body.data).to.deep.equal(['1']);
    expect(response.status).to.equal(200);
  });
});
