import { NextFunction, Request, Response } from 'express';
import { validateData } from '../helpers';

import {
  deviceSchema,
  transactionSchema,
  optionalFieldsDeviceSchema,
  verifyTransactionSchema,
  uuidSchema
} from '../schema';

export const validateDeviceSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validateData(req.body, deviceSchema);
    next();
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export const validateTransactionSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validateData(req.body, transactionSchema);
    next();
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export const validateUUIDSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validateData(req.params.deviceId, uuidSchema);
    next();
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export const validateOptionDeviceSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validateData(req.body, optionalFieldsDeviceSchema);
    next();
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export const validateSignedTransactionSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validateData(req.body, verifyTransactionSchema);
    next();
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};
