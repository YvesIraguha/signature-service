import CreateDeviceInput from './createDevice';
import PutDeviceInput from './putDevice';
import PatchDeviceInput from './patchDevice';

export interface IDeviceDA {
  addDevice: (devicesObject: CreateDeviceInput) => Promise<any>;
  getDeviceById: (id: string, excludeKey: boolean) => Promise<any>;
  getDevices: () => Promise<string>;
  updateDeviceById: (
    id: string,
    deviceFields: PutDeviceInput | PatchDeviceInput
  ) => Promise<any>;
  removeDeviceById: (id: string) => Promise<string>;
  updateNumberOfSignedTransactions: (id: string) => Promise<string>;
  getDeviceWithTransactions: (id: string) => Promise<string>;
}
