import Joi from "joi";

export const deviceSchema = Joi.object().keys({
  signatureAlgorithm: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  status: Joi.string().min(3).required(),
});

export const transactionSchema = Joi.object().keys({
  number: Joi.string().required(),
  deviceId: Joi.string().guid({
    version: ["uuidv4"],
  }),
  timeOfTransaction: Joi.string().isoDate().required(),
  place: Joi.string().min(3).required(),
  price: Joi.string().min(3).required(),
  currency: Joi.string().min(3).required(),
  paymentMethod: Joi.string().min(3).required(),
  item: Joi.string().min(3).required(),
});
