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
    const device = await this.DeviceModel.findByPk(
      id,
      excludePrivateKey && {
        attributes: { exclude: ['privateKey'] }
      }
    );

    return device;
  }

  async getDevices() {
    const devices = await this.DeviceModel.findAll({
      attributes: { exclude: ['privateKey'] }
    });
    return devices;
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
    const removedDevice = await this.DeviceModel.destroy({ where: { id } });
    return removedDevice;
  }

  async updateNumberOfSignedTransactions(id: string) {
    const updatedDevice = await this.DeviceModel.increment(
      { numberOfSignedTransactions: 1 },
      { returning: true, where: { id } }
    );
    return updatedDevice;
  }

  async getDeviceWithTransactions(id: string) {
    const deviceWithTransactions = await this.DeviceModel.findByPk(id, {
      include: { model: this.TxModel, as: 'transactions' },
      attributes: { exclude: ['privateKey'] }
    });
    return deviceWithTransactions;
  }
}

export default new DeviceDA(models.Device, models.Transaction);
