import { Request, Response } from "express";

type callback = (req: Request, res: Response) => Promise<any>;

export const asyncHandler =
  (fn: callback) => async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  };

export const validateBody = async (data: any, schema: any) => {
  try {
    await schema.validate(data, schema);
  } catch (err: any) {
    throw new Error(err);
  }
};
