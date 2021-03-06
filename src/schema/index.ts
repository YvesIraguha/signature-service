import Joi from 'joi';

export const deviceSchema = Joi.object().keys({
  signatureAlgorithm: Joi.string().trim().valid('rsa', 'ec').required(),
  description: Joi.string().trim().min(4).required()
  // status: Joi.string().trim().min(3).required()
});

export const transactionSchema = Joi.object().keys({
  transaction: Joi.object()
    .keys({
      number: Joi.number().required(),
      deviceId: Joi.string()
        .trim()
        .guid({
          version: ['uuidv4']
        })
        .required(),
      quantity: Joi.number().min(0).required(),
      timeOfTransaction: Joi.string().trim().trim().isoDate().required(),
      place: Joi.string().trim().min(3).required(),
      price: Joi.number().min(0).required(),
      currency: Joi.string().trim().min(2).required(),
      totalAmount: Joi.number().min(0).required(),
      paymentMethod: Joi.string().trim().min(3).required(),
      item: Joi.string().trim().min(3).required()
    })
    .required()
});

export const verifyTransactionSchema = Joi.object().keys({
  transaction: Joi.object()
    .keys({
      number: Joi.number().required(),
      deviceId: Joi.string()
        .trim()
        .guid({
          version: ['uuidv4']
        })
        .required(),
      quantity: Joi.number().min(0).required(),
      timeOfTransaction: Joi.string().trim().isoDate().required(),
      place: Joi.string().trim().min(3).required(),
      price: Joi.number().min(0).required(),
      currency: Joi.string().trim().min(2).required(),
      totalAmount: Joi.number().min(0).required(),
      paymentMethod: Joi.string().trim().min(3).required(),
      item: Joi.string().trim().min(3).required(),
      id: Joi.string()
        .trim()
        .guid({
          version: ['uuidv4']
        })
        .required(),
      signature: Joi.object()
        .keys({
          value: Joi.string().trim().min(20).required(),
          algorithm: Joi.string().trim().valid('rsa', 'ec').required(),
          publicKey: Joi.string().trim().min(30).required()
        })
        .required()
    })
    .required()
});

export const uuidSchema = Joi.object().keys({
  deviceId: Joi.string()
    .trim()
    .guid({
      version: ['uuidv4']
    })
});

export const optionalFieldsDeviceSchema = Joi.object().keys({
  // signatureAlgorithm: Joi.string().trim().min(3).required(),
  description: Joi.string().trim().min(3).required()
  // status: Joi.string().trim().min(3).required()
});
