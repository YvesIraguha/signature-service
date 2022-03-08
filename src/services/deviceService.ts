import DeviceDA from "../dataAccess/devices";
import CRUD from "../interfaces/CRUD";

import CreateDeviceInput from "../interfaces/createDevice";
import PutDeviceInput from "../interfaces/putDevice";
import PatchDeviceInput from "../interfaces/patchDevice";

class DevicesService implements CRUD {
  async create(resource: CreateDeviceInput) {
    return DeviceDA.addDevice(resource);
  }
  async deleteById(id: string) {
    return DeviceDA.removeDeviceById(id);
  }

  async list(limit: number, page: number) {
    return DeviceDA.getDevices(limit, page);
  }

  async patchById(id: string, resource: PatchDeviceInput) {
    return DeviceDA.updateDeviceById(id, resource);
  }

  async readById(id: string) {
    return DeviceDA.getDeviceById(id);
  }

  async putById(id: string, resource: PutDeviceInput) {
    return DeviceDA.updateDeviceById(id, resource);
  }
  async readAssociationsById(id: string) {
    return DeviceDA.getDeviceWithTransactions(id);
  }
}

export default new DevicesService();
