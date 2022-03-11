import request from 'supertest';
import sinon from 'sinon';
import models from '../../models';
import app from '../../app';
import {
  sampleTransactionInput,
  sampleDeviceResponse,
  sampleSignedTransaction,
  keyPairs
} from './fixtures';

const Transactions = models.Transaction;
const Devices = models.Device;

jest.mock('uuid', () => {
  const originalModule = jest.requireActual('uuid');
  return {
    __esModule: true,
    ...originalModule,
    v4: jest.fn(() => '634b59eb-dc11-48f0-ad46-ca2d85ef2a9d')
  };
});

jest.mock('../../src/helpers', () => {
  const originalModule = jest.requireActual('../../src/helpers');
  return {
    __esModule: true,
    ...originalModule,
    signData: () => sampleSignedTransaction.signature.value
  };
});

describe('/sign-tx', () => {
  afterEach(() => {
    sinon.restore();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('POST', () => {
    it('should sign a transaction successfully', async () => {
      const createTransactionStub = sinon.stub(Transactions, 'create');

      const findByPkStub = sinon.stub(Devices, 'findByPk');
      const putById = sinon.stub(Devices, 'update');
      findByPkStub.returns({
        ...sampleDeviceResponse,
        privateKey: keyPairs.privateKey
      });
      createTransactionStub.returns(sampleTransactionInput);
      putById.returns([[1], {}]);
      const response = await request(app)
        .post('/sign-tx')
        .send({ transaction: sampleTransactionInput });
      expect(response.status).toEqual(201);
      expect(response.body.data).toEqual(sampleSignedTransaction);
    });

    it('should return non-existing signature device error', async () => {
      const findByPkStub = sinon.stub(Devices, 'findByPk');
      findByPkStub.returns({});
      const response = await request(app)
        .post('/sign-tx')
        .send({
          transaction: {
            ...sampleTransactionInput,
            deviceId: '5e481ed0-b228-4053-8174-6e6b05f357fd'
          }
        });
      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual(
        'signature device with provided id does not exist'
      );
    });

    it('should return error for transaction not provided', async () => {
      const createSpy = sinon.spy(Transactions, 'create');

      const response = await request(app).post('/sign-tx').send({});
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual(
        'ValidationError: "transaction" is required'
      );
      sinon.assert.notCalled(createSpy);
    });

    it('should return error of missing key', async () => {
      const createSpy = sinon.spy(Transactions, 'create');

      const response = await request(app)
        .post('/sign-tx')
        .send({ transaction: {} });
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual(
        'ValidationError: "transaction.number" is required'
      );
      sinon.assert.notCalled(createSpy);
    });

    it('should return error of not allowed key', async () => {
      const createSpy = sinon.spy(Transactions, 'create');

      const response = await request(app)
        .post('/sign-tx')
        .send({
          transaction: {
            ...sampleTransactionInput,
            description: 'transaction description'
          }
        });
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual(
        'ValidationError: "transaction.description" is not allowed'
      );
      sinon.assert.notCalled(createSpy);
    });
  });
});

describe('/verify-tx', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('POST', () => {
    it('should verify transaction signature successfully by returning not authentic data', async () => {
      const response = await request(app)
        .post('/verify-tx')
        .send({
          transaction: {
            ...sampleSignedTransaction,
            id: '634b59eb-dc11-48f0-ad46-ca2d85ef2a9d'
          }
        });
      expect(response.status).toEqual(201);
      expect(response.body.data).toEqual({ isAuthentic: false });
    });

    it('should return error of a missing key', async () => {
      const response = await request(app)
        .post('/verify-tx')
        .send({
          transaction: {
            ...sampleSignedTransaction
          }
        });
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual(
        'ValidationError: "transaction.id" is required'
      );
    });
  });
});
