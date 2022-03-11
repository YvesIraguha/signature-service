import { v4 as uuidv4 } from 'uuid';
import debug from 'debug';
import models from '../../models';

import CreateDeviceInput from '../interfaces/createDevice';
import PatchDeviceInput from '../interfaces/patchDevice';
import PutDeviceInput from '../interfaces/putDevice';
import { generateKeyPair } from '../helpers/index';

const log: debug.IDebugger = debug('app:signature-device-da');

class DeviceDA {
  DeviceModel = models.Device;
  TxModel = models.Transaction;

  constructor() {
    log('Created a new instance of  device DA');
  }

  async addDevice(deviceFields: CreateDeviceInput) {
    const id = uuidv4();
    const { publicKey, privateKey } = generateKeyPair();
    const device = {
      ...deviceFields,
      id,
      publicKey,
      privateKey,
      signatureAlgorithm: 'rsa',
      transactionDataEncoding: 'utf-8',
      status: 'ACTIVE',
      numberOfSignedTransactions: 0
    };

    const newDevice = await this.DeviceModel.create(device);
    return newDevice;
  }

  async getDeviceById(id: string) {
    log(id);
    return this.DeviceModel.findByPk(id, {
      attributes: { exclude: ['privateKey'] }
    });
  }

  async getDevices(limit = 25, page = 0) {
    return this.DeviceModel.findAll({
      attributes: { exclude: ['privateKey'] }
    });
  }

  async updateDeviceById(
    id: string,
    deviceFields: PutDeviceInput | PatchDeviceInput
  ) {
    const updatedDevice = await this.DeviceModel.update(
      { ...deviceFields },
      { returning: true, where: { id } }
    );
    return updatedDevice;
  }

  async removeDeviceById(id: string) {
    return this.DeviceModel.destroy({ where: { id } });
  }

  async getDeviceWithTransactions(id: string) {
    return this.DeviceModel.findByPk(id, {
      include: { model: this.TxModel, as: 'transactions' }
    });
  }
}

export default new DeviceDA();
