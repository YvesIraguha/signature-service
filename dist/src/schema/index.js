"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalFieldsDeviceSchema = exports.uuidSchema = exports.verifyTransactionSchema = exports.transactionSchema = exports.deviceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.deviceSchema = joi_1.default.object().keys({
    // signatureAlgorithm: Joi.string().min(3).required(),
    description: joi_1.default.string().min(10).required()
    // status: Joi.string().min(3).required()
});
exports.transactionSchema = joi_1.default.object().keys({
    transaction: joi_1.default.object()
        .keys({
        number: joi_1.default.number().required(),
        deviceId: joi_1.default.string()
            .guid({
            version: ['uuidv4']
        })
            .required(),
        quantity: joi_1.default.number().min(0).required(),
        timeOfTransaction: joi_1.default.string().isoDate().required(),
        place: joi_1.default.string().min(3).required(),
        price: joi_1.default.number().min(0).required(),
        currency: joi_1.default.string().min(2).required(),
        totalAmount: joi_1.default.number().min(0).required(),
        paymentMethod: joi_1.default.string().min(3).required(),
        item: joi_1.default.string().min(3).required()
    })
        .required()
});
exports.verifyTransactionSchema = joi_1.default.object().keys({
    transaction: joi_1.default.object()
        .keys({
        number: joi_1.default.number().required(),
        deviceId: joi_1.default.string()
            .guid({
            version: ['uuidv4']
        })
            .required(),
        quantity: joi_1.default.number().min(0).required(),
        timeOfTransaction: joi_1.default.string().isoDate().required(),
        place: joi_1.default.string().min(3).required(),
        price: joi_1.default.number().min(0).required(),
        currency: joi_1.default.string().min(2).required(),
        totalAmount: joi_1.default.number().min(0).required(),
        paymentMethod: joi_1.default.string().min(3).required(),
        item: joi_1.default.string().min(3).required(),
        id: joi_1.default.string()
            .guid({
            version: ['uuidv4']
        })
            .required(),
        signature: joi_1.default.object()
            .keys({
            value: joi_1.default.string().min(20).required(),
            algorithm: joi_1.default.string().min(3).required(),
            publicKey: joi_1.default.string().min(30).required()
        })
            .required()
    })
        .required()
});
exports.uuidSchema = joi_1.default.string().guid({
    version: ['uuidv4']
});
exports.optionalFieldsDeviceSchema = joi_1.default.object().keys({
    // signatureAlgorithm: Joi.string().min(3).required(),
    description: joi_1.default.string().min(10)
    // status: Joi.string().min(3).required()
});
