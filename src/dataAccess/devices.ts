import debug from 'debug';
import models from '../../models';
import CreateDeviceInput from '../interfaces/createDevice';
import PatchDeviceInput from '../interfaces/patchDevice';
import PutDeviceInput from '../interfaces/putDevice';
import { IDeviceDA } from '../interfaces/IDeviceDA';

const log: debug.IDebugger = debug('app:signature-device-da');

export class DeviceDA implements IDeviceDA {
  DeviceModel: any;
  TxModel: any;

  constructor(devicesModel: any, transactionsModel: any) {
    log('Created a new instance of  device DA');
    this.DeviceModel = devicesModel;
    this.TxModel = transactionsModel;
  }

  async addDevice(deviceFields: CreateDeviceInput) {
    const newDevice = await this.DeviceModel.create(deviceFields);
    return newDevice;
  }

  async getDeviceById(id: string, excludePrivateKey = true) {
    log(id);
    return this.DeviceModel.findByPk(
      id,
      excludePrivateKey && {
        attributes: { exclude: ['privateKey'] }
      }
    );
  }

  async getDevices() {
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

  async updateNumberOfSignedTransactions(id: string) {
    const updatedDevice = await this.DeviceModel.increment(
      { numberOfSignedTransactions: 1 },
      { returning: true, where: { id } }
    );
    return updatedDevice;
  }

  async getDeviceWithTransactions(id: string) {
    return this.DeviceModel.findByPk(id, {
      include: { model: this.TxModel, as: 'transactions' },
      attributes: { exclude: ['privateKey'] }
    });
  }
}

export default new DeviceDA(models.Device, models.Transaction);
