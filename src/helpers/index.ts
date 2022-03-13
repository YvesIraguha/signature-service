import { Request, Response } from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

type callback = (req: Request, res: Response) => Promise<any>;

export const asyncHandler =
  (fn: callback) => async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  };

export const validateData = async (data: any, schema: any) => {
  try {
    await schema.validateAsync(data);
  } catch (err: any) {
    throw new Error(err);
  }
};

const convertDataToString = (data: object) => JSON.stringify(data);

export const generateKeyPair = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'top secret'
    }
  });

  return { publicKey, privateKey };
};

export const signData = (data: object, privateKey: string) => {
  const signature = crypto.sign(
    'sha256',
    Buffer.from(convertDataToString(data), 'utf-8'),
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      passphrase: process.env.PASSPHRASE
    }
  );
  return signature.toString('base64');
};

export const verifySignature = (
  data: any,
  publicKey: string,
  signature: string
) => {
  delete data['signature'];
  const isVerified = crypto.verify(
    'sha256',
    Buffer.from(convertDataToString(data)),
    { key: publicKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING },
    Buffer.from(signature, 'base64')
  );
  return isVerified;
};
