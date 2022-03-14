import request from 'supertest';
import sinon from 'sinon';
import models from '../../models';
import app from '../../app';
import { sampleDeviceResponse, sampleTransactionResponse } from './fixtures';

const Devices = models.Device;

describe('/devices', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET', () => {
    it('should return a list of all devices', async () => {
      const findAllStub = sinon.stub(Devices, 'findAll');
      findAllStub.returns([sampleDeviceResponse]);

      const response = await request(app).get('/devices');
      expect(response.body.data).toEqual([sampleDeviceResponse]);
      expect(response.status).toEqual(200);
    });
    it('should return empty list of devices', async () => {
      const findAllStub = sinon.stub(Devices, 'findAll');
      findAllStub.returns([]);
      const response = await request(app).get('/devices');
      expect(response.body.data).toEqual([]);
      expect(response.status).toEqual(200);
    });
  });

  describe('POST', () => {
    it('should create a device successfully', async () => {
      const createStub = sinon.stub(Devices, 'create');
      createStub.returns(sampleDeviceResponse);
      const response = await request(app).post('/devices').send({
        description: 'an RSA device to sign transactions',
        signatureAlgorithm: 'ec'
      });
      expect(response.status).toEqual(201);
      expect(response.body.data).toEqual(sampleDeviceResponse);
    });

    it('should return lack of device description error', async () => {
      const createSpy = sinon.spy(Devices, 'create');

      const response = await request(app).post('/devices').send({
        signatureAlgorithm: 'ec',
        name: 'hello'
      });
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual(
        'ValidationError: "description" is required'
      );
      sinon.assert.notCalled(createSpy);
    });

    it('should return error for not allowed key', async () => {
      const createSpy = sinon.spy(Devices, 'create');

      const response = await request(app).post('/devices').send({
        privateKey: 'hello',
        signatureAlgorithm: 'ec',
        description: 'an RSA device to sign transactions'
      });
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual(
        'ValidationError: "privateKey" is not allowed'
      );
      sinon.assert.notCalled(createSpy);
    });
  });

  describe('/:deviceId', () => {
    describe('GET', () => {
      it('should return one device', async () => {
        const findByPkStub = sinon.stub(Devices, 'findByPk');
        findByPkStub.returns(sampleDeviceResponse);
        const response = await request(app).get(
          '/devices/9f28d121-fd36-493d-b432-9c4c6dff1632'
        );
        expect(response.status).toEqual(200);
        expect(response.body.data).toEqual(sampleDeviceResponse);
        expect(response.body.data.privateKey).not.toBeDefined();
      });
      it('should return no device with provided id', async () => {
        const findByPkStub = sinon.stub(Devices, 'findByPk');
        findByPkStub.returns({});
        const response = await request(app).get(
          '/devices/9f28d121-fd36-493d-b432-9c4c6dff1632'
        );
        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual(
          'There is not device with provided id'
        );
      });

      it('should return invalid id error', async () => {
        const response = await request(app).get('/devices/1');
        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual(
          'ValidationError: "value" must be a valid GUID'
        );
      });
    });

    describe('DELETE', () => {
      it('should delete one device with provided id', async () => {
        const deleteStub = sinon.stub(Devices, 'destroy');
        deleteStub.returns([1]);
        const response = await request(app).delete(
          '/devices/9f28d121-fd36-493d-b432-9c4c6dff1632'
        );
        expect(response.status).toEqual(204);
      });
      it('should return no device with provided id', async () => {
        const deleteStub = sinon.stub(Devices, 'destroy');
        deleteStub.returns(0);
        const response = await request(app).delete(
          '/devices/9f28d121-fd36-493d-b432-9c4c6dff1632'
        );
        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual(
          'There is not device with provided id'
        );
      });
    });
    describe('PUT', () => {
      it('should update device with provided id successfully', async () => {
        const updateStub = sinon.stub(Devices, 'update');
        updateStub.returns([
          1,
          [{ ...sampleDeviceResponse, description: 'new description' }]
        ]);
        const response = await request(app)
          .put('/devices/923d5a4c-ca14-40d7-a28c-ad6068152885')
          .send({ description: 'new description' });

        expect(response.status).toEqual(201);
        expect(response.body.data).toEqual({
          ...sampleDeviceResponse,
          description: 'new description'
        });
      });
      it('should return no device with provided id', async () => {
        const updateStub = sinon.stub(Devices, 'update');
        updateStub.returns([0, []]);
        const response = await request(app)
          .put('/devices/923d5a4c-ca14-40d7-a28c-ad6068152885')
          .send({ description: 'new description' });
        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual(
          'There is not device with provided id'
        );
      });

      it('should return lack of device description error', async () => {
        const response = await request(app)
          .put('/devices/923d5a4c-ca14-40d7-a28c-ad6068152885')
          .send({
            name: 'hello'
          });
        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual(
          'ValidationError: "description" is required'
        );
      });

      it('should return error for not allowed keys', async () => {
        const response = await request(app)
          .put('/devices/923d5a4c-ca14-40d7-a28c-ad6068152885')
          .send({
            privateKey: 'hello',
            description: 'an RSA device to sign transactions'
          });
        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual(
          'ValidationError: "privateKey" is not allowed'
        );
      });
    });
    describe('PATCH', () => {
      it('should patch device with provided id successfully', async () => {
        const updateStub = sinon.stub(Devices, 'update');
        updateStub.returns([
          1,
          [{ ...sampleDeviceResponse, description: 'new description' }]
        ]);
        const response = await request(app)
          .patch('/devices/923d5a4c-ca14-40d7-a28c-ad6068152885')
          .send({ description: 'new description' });
        expect(response.status).toEqual(201);
        expect(response.body.data).toEqual({
          ...sampleDeviceResponse,
          description: 'new description'
        });
      });

      it('should not patch device without description provided', async () => {
        const updateStub = sinon.stub(Devices, 'update');
        updateStub.returns([1, [sampleDeviceResponse]]);
        const response = await request(app)
          .patch('/devices/923d5a4c-ca14-40d7-a28c-ad6068152885')
          .send({});
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({
          error: 'ValidationError: "description" is required'
        });
      });
    });
    describe('/transactions', () => {
      describe('GET', () => {
        it('should return a list of transactions signed by device with provided id', async () => {
          const findByPkStub = sinon.stub(Devices, 'findByPk');
          findByPkStub.returns({
            ...sampleDeviceResponse,
            transactions: [sampleTransactionResponse],
            numberOfSignedTransactions: 1
          });
          const response = await request(app).get(
            '/devices/9f28d121-fd36-493d-b432-9c4c6dff1632/transactions'
          );
          expect(response.status).toEqual(200);
          expect(response.body.data).toEqual({
            ...sampleDeviceResponse,
            transactions: [sampleTransactionResponse],
            numberOfSignedTransactions: 1
          });
          expect(response.body.data.privateKey).not.toBeDefined();
        });
        it('should return no device with provided id', async () => {
          const findByPkStub = sinon.stub(Devices, 'findByPk');
          findByPkStub.returns({});
          const response = await request(app).get(
            '/devices/9f28d121-fd36-493d-b432-9c4c6dff1632/transactions'
          );
          expect(response.status).toEqual(404);
          expect(response.body.error).toEqual(
            'There is not device with provided id'
          );
        });
      });
    });
  });
});
