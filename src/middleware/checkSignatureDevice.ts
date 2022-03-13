import { NextFunction, Request, Response } from 'express';
import deviceService from '../services/deviceService';

export const checkSignatureDeviceExistence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signatureDevice = await deviceService.readById(
    req.body.transaction.deviceId,
    false
  );

  if (signatureDevice && signatureDevice.id) {
    req.body.signatureDevice = signatureDevice;
    next();
    return;
  }

  res
    .status(404)
    .send({ error: 'signature device with provided id does not exist' });
};
