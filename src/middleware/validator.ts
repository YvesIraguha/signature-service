import { NextFunction, Request, Response } from 'express';
import { validateBody } from '../helpers';
import { deviceSchema, transactionSchema } from '../schema';

export const validateDeviceSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validateBody(req.body, deviceSchema);
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
    await validateBody(req.body, transactionSchema);
    next();
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};
