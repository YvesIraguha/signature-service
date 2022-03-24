import { NextFunction, Response } from 'express';
import { validateData } from '../helpers';

import {
  deviceSchema,
  transactionSchema,
  optionalFieldsDeviceSchema,
  verifyTransactionSchema,
  uuidSchema
} from '../schema';

const validateSchema =
  (schema: any, requestKey = 'body') =>
  async (req: any, res: Response, next: NextFunction) => {
    try {
      await validateData(req[requestKey], schema);
      next();
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  };

export const validateDeviceSchema = validateSchema(deviceSchema);
export const validateTransactionSchema = validateSchema(transactionSchema);
export const validateUUIDSchema = validateSchema(uuidSchema, 'params');
export const validateOptionalDeviceSchema = validateSchema(
  optionalFieldsDeviceSchema
);
export const validateSignedTransactionSchema = validateSchema(
  verifyTransactionSchema
);
