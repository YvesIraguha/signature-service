import SignatureDeviceDA from "../dataAccess/devices";
import CRUD from "../interfaces/CRUD";

import CreateDeviceInput from "../interfaces/createDevice";
import PutDeviceInput from "../interfaces/putDevice";
import PatchDeviceInput from "../interfaces/patchDevice";

class DevicesService implements CRUD {
  async create(resource: CreateDeviceInput) {
    return SignatureDeviceDA.addDevice(resource);
  }
  async deleteById(id: string) {
    return SignatureDeviceDA.removeDeviceById(id);
  }

  async list(limit: number, page: number) {
    return SignatureDeviceDA.getDevices(limit, page);
  }

  async patchById(id: string, resource: PatchDeviceInput) {
    return SignatureDeviceDA.updateDeviceById(id, resource);
  }

  async readById(id: string) {
    return SignatureDeviceDA.getDeviceById(id);
  }

  async putById(id: string, resource: PutDeviceInput) {
    return SignatureDeviceDA.updateDeviceById(id, resource);
  }
}

export default new DevicesService();
