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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSignatureDeviceExistence = void 0;
const deviceService_1 = __importDefault(require("../services/deviceService"));
const checkSignatureDeviceExistence = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const signatureDevice = yield deviceService_1.default.readById(req.body.transaction.deviceId, false);
    if (signatureDevice && signatureDevice.id) {
        req.body.signatureDevice = signatureDevice;
        next();
        return;
    }
    res
        .status(404)
        .send({ error: 'signature device with provided id does not exist' });
});
exports.checkSignatureDeviceExistence = checkSignatureDeviceExistence;
