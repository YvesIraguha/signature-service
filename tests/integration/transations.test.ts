import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import models from '../../models';
import { app } from '../../index';

chai.use(chaiHttp);

const Transaction = models.Transaction;
describe('/sign-tx', () => {
  beforeEach(() => {
    const findAllStub = sinon.stub(Transaction, 'findAll');
    const findByPkStub = sinon.stub(Transaction, 'findByPk');
    const createStub = sinon.stub(Transaction, 'create');
    const deleteStub = sinon.stub(Transaction, 'destroy');

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
  it('should sign a transaction', async () => {
    const response = await chai
      .request(app)
      .post('/sign-tx')
      .send({ publicKey: 'publicKey', description: 'description' });
    expect(response.body.data).to.deep.equal({
      publicKey: 'publicKey',
      description: 'description',
      id: '2'
    });
    expect(response.status).to.equal(201);
  });
});
