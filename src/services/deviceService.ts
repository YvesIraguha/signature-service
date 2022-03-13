import DeviceDA from '../dataAccess/devices';
import CRUD from '../interfaces/CRUD';

import CreateDeviceInput from '../interfaces/createDevice';
import PutDeviceInput from '../interfaces/putDevice';
import PatchDeviceInput from '../interfaces/patchDevice';

class DevicesService implements CRUD {
  async create(resource: CreateDeviceInput) {
    return DeviceDA.addDevice(resource);
  }
  async deleteById(id: string) {
    return DeviceDA.removeDeviceById(id);
  }

  async list() {
    return DeviceDA.getDevices();
  }

  async patchById(id: string, resource: PatchDeviceInput) {
    return DeviceDA.updateDeviceById(id, resource);
  }

  async readById(id: string, excludePrivateKey: boolean) {
    return DeviceDA.getDeviceById(id, excludePrivateKey);
  }

  async putById(id: string, resource: PutDeviceInput) {
    return DeviceDA.updateDeviceById(id, resource);
  }
  async readAssociationsById(id: string) {
    return DeviceDA.getDeviceWithTransactions(id);
  }
}

export default new DevicesService();
