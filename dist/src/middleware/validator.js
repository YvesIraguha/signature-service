"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignedTransactionSchema = exports.validateOptionDeviceSchema = exports.validateUUIDSchema = exports.validateTransactionSchema = exports.validateDeviceSchema = void 0;
const helpers_1 = require("../helpers");
const schema_1 = require("../schema");
const validateDeviceSchema = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, helpers_1.validateData)(req.body, schema_1.deviceSchema);
        next();
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.validateDeviceSchema = validateDeviceSchema;
const validateTransactionSchema = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, helpers_1.validateData)(req.body, schema_1.transactionSchema);
        next();
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.validateTransactionSchema = validateTransactionSchema;
const validateUUIDSchema = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, helpers_1.validateData)(req.params.deviceId, schema_1.uuidSchema);
        next();
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.validateUUIDSchema = validateUUIDSchema;
const validateOptionDeviceSchema = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, helpers_1.validateData)(req.body, schema_1.optionalFieldsDeviceSchema);
        next();
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.validateOptionDeviceSchema = validateOptionDeviceSchema;
const validateSignedTransactionSchema = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, helpers_1.validateData)(req.body, schema_1.verifyTransactionSchema);
        next();
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.validateSignedTransactionSchema = validateSignedTransactionSchema;
