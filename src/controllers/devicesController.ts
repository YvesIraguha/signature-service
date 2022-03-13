import { Request, Response } from 'express';
import debug from 'debug';
import DevicesService from '../services/deviceService';

const log: debug.IDebugger = debug('app:devices-controller');

class DevicesController {
  async listDevices(req: Request, res: Response) {
    const devices = await DevicesService.list();
    res.status(200).send({ data: devices });
  }

  async getDeviceById(req: Request, res: Response) {
    log(req.params);
    const device = await DevicesService.readById(req.params.deviceId, true);
    if (device && device.id) {
      return res.status(200).send({ data: device });
    }
    res.status(404).send({ error: 'There is not device with provided id' });
  }

  async createDevice(req: Request, res: Response) {
    const device = await DevicesService.create(req.body);
    res.status(201).send({ data: device });
  }

  async put(req: Request, res: Response) {
    const [numberOfUpdatedDevices, [updatedDevice]] =
      await DevicesService.putById(req.params.deviceId, req.body);

    if (numberOfUpdatedDevices) {
      return res.status(201).send({
        data: updatedDevice
      });
    }
    res.status(404).send({ error: 'There is not device with provided id' });
  }

  async removeDevice(req: Request, res: Response) {
    const output = await DevicesService.deleteById(req.params.deviceId);
    if (output) return res.status(204).send();
    res.status(404).send({ error: 'There is not device with provided id' });
  }

  async getDevicesTransactions(req: Request, res: Response) {
    const device = await DevicesService.readAssociationsById(
      req.params.deviceId
    );
    if (device.id) {
      return res.status(200).send({ data: device });
    }
    res.status(404).send({ error: 'There is not device with provided id' });
  }
}

export default new DevicesController();
