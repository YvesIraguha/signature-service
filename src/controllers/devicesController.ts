import { Request, Response } from "express";
import debug from "debug";
import DevicesService from "../services/deviceService";

const log: debug.IDebugger = debug("app:devices-controller");

class DevicesController {
  async listDevices(req: Request, res: Response) {
    const devices = await DevicesService.list(100, 0);
    res.status(200).send({ data: devices });
  }

  async getDeviceById(req: Request, res: Response) {
    log(req.params);
    const device = await DevicesService.readById(req.params.deviceId);
    res.status(200).send({ data: device });
  }

  async createDevice(req: Request, res: Response) {
    const device = await DevicesService.create(req.body);
    res.status(201).send({ data: device });
  }

  async patch(req: Request, res: Response) {
    log(await DevicesService.patchById(req.params.id, req.body));
    res.status(204).send();
  }

  async put(req: Request, res: Response) {
    log(await DevicesService.putById(req.params.deviceId, req.body));
    res.status(204).send();
  }

  async removeDevice(req: Request, res: Response) {
    log(await DevicesService.deleteById(req.params.deviceId));
    res.status(204).send();
  }
}

export default new DevicesController();
