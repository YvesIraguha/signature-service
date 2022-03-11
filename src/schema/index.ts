import Joi from 'joi';

export const deviceSchema = Joi.object().keys({
  // signatureAlgorithm: Joi.string().min(3).required(),
  description: Joi.string().min(10).required()
  // status: Joi.string().min(3).required()
});

export const transactionSchema = Joi.object().keys({
  transaction: Joi.object()
    .keys({
      number: Joi.number().required(),
      deviceId: Joi.string()
        .guid({
          version: ['uuidv4']
        })
        .required(),
      quantity: Joi.number().min(0).required(),
      timeOfTransaction: Joi.string().isoDate().required(),
      place: Joi.string().min(3).required(),
      price: Joi.number().min(0).required(),
      currency: Joi.string().min(2).required(),
      totalAmount: Joi.number().min(0).required(),
      paymentMethod: Joi.string().min(3).required(),
      item: Joi.string().min(3).required()
    })
    .required()
});

export const verifyTransactionSchema = Joi.object().keys({
  transaction: Joi.object()
    .keys({
      number: Joi.number().required(),
      deviceId: Joi.string()
        .guid({
          version: ['uuidv4']
        })
        .required(),
      quantity: Joi.number().min(0).required(),
      timeOfTransaction: Joi.string().isoDate().required(),
      place: Joi.string().min(3).required(),
      price: Joi.number().min(0).required(),
      currency: Joi.string().min(2).required(),
      totalAmount: Joi.number().min(0).required(),
      paymentMethod: Joi.string().min(3).required(),
      item: Joi.string().min(3).required(),
      id: Joi.string()
        .guid({
          version: ['uuidv4']
        })
        .required(),
      signature: Joi.object()
        .keys({
          value: Joi.string().min(20).required(),
          algorithm: Joi.string().min(3).required(),
          publicKey: Joi.string().min(30).required()
        })
        .required()
    })
    .required()
});

export const uuidSchema = Joi.string().guid({
  version: ['uuidv4']
});

export const optionalFieldsDeviceSchema = Joi.object().keys({
  // signatureAlgorithm: Joi.string().min(3).required(),
  description: Joi.string().min(10)
  // status: Joi.string().min(3).required()
});
