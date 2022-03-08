import { v4 as uuidv4 } from 'uuid';
import debug from 'debug';
import models from '../../models';

import CreateDeviceInput from '../interfaces/createDevice';
import PatchDeviceInput from '../interfaces/patchDevice';
import PutDeviceInput from '../interfaces/putDevice';

const log: debug.IDebugger = debug('app:signature-device-da');

class DeviceDA {
  DeviceModel = models.Device;
  TxModel = models.Transaction;

  constructor() {
    log('Created a new instance of  device DA');
  }

  async addDevice(deviceFields: CreateDeviceInput) {
    const id = uuidv4();
    const device = {
      ...deviceFields,
      id
    };
    const newDevice = await this.DeviceModel.create(device);
    return newDevice;
  }

  async getDeviceById(id: string) {
    log(id);
    return this.DeviceModel.findByPk(id);
  }

  async getDevices(limit = 25, page = 0) {
    return this.DeviceModel.findAll();
  }

  async updateDeviceById(
    id: string,
    deviceFields: PutDeviceInput | PatchDeviceInput
  ) {
    const existingDevice = await this.DeviceModel.update(
      { ...deviceFields },
      { returning: true, where: { id } }
    );
    return existingDevice;
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
