import { v4 as uuidv4 } from 'uuid';
import deviceDAInstance, { DeviceDA } from '../dataAccess/devices';
import { CRUD, Associations } from '../interfaces/CRUD';

import CreateDeviceInput from '../interfaces/createDevice';
import PutDeviceInput from '../interfaces/putDevice';
import PatchDeviceInput from '../interfaces/patchDevice';
import { generateKeyPair } from '../helpers/index';

class DevicesService implements CRUD, Associations {
  deviceDataAccess: DeviceDA;
  constructor(dataAccessInstance: DeviceDA) {
    this.deviceDataAccess = dataAccessInstance;
  }

  async create(resource: CreateDeviceInput) {
    const id = uuidv4();
    const { publicKey, privateKey } = generateKeyPair(
      resource.signatureAlgorithm
    );
    const device = {
      ...resource,
      id,
      publicKey,
      privateKey,
      transactionDataEncoding: 'utf-8',
      status: 'ACTIVE',
      numberOfSignedTransactions: 0
    };
    return this.deviceDataAccess.addDevice(device);
  }

  async deleteById(id: string) {
    return this.deviceDataAccess.removeDeviceById(id);
  }

  async list() {
    return this.deviceDataAccess.getDevices();
  }

  async patchById(id: string, resource: PatchDeviceInput) {
    return this.deviceDataAccess.updateDeviceById(id, resource);
  }

  async readById(id: string, excludePrivateKey: boolean) {
    return this.deviceDataAccess.getDeviceById(id, excludePrivateKey);
  }

  async putById(id: string, resource: PutDeviceInput) {
    return this.deviceDataAccess.updateDeviceById(id, resource);
  }
  async readAssociationsById(id: string) {
    return this.deviceDataAccess.getDeviceWithTransactions(id);
  }
}

export default new DevicesService(deviceDAInstance);
