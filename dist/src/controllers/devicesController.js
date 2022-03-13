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
const debug_1 = __importDefault(require("debug"));
const deviceService_1 = __importDefault(require("../services/deviceService"));
const log = (0, debug_1.default)('app:devices-controller');
class DevicesController {
    listDevices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const devices = yield deviceService_1.default.list(100, 0);
            res.status(200).send({ data: devices });
        });
    }
    getDeviceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(req.params);
            const device = yield deviceService_1.default.readById(req.params.deviceId);
            if (device && device.id) {
                return res.status(200).send({ data: device });
            }
            res.status(404).send({ error: 'There is not device with provided id' });
        });
    }
    createDevice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield deviceService_1.default.create(req.body);
            res.status(201).send({ data: device });
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [numberOfUpdatedDevices, [updatedDevice]] = yield deviceService_1.default.putById(req.params.deviceId, req.body);
            if (numberOfUpdatedDevices) {
                return res.status(201).send({
                    data: updatedDevice
                });
            }
            res.status(404).send({ error: 'There is not device with provided id' });
        });
    }
    removeDevice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const output = yield deviceService_1.default.deleteById(req.params.deviceId);
            if (output)
                return res.status(204).send();
            res.status(404).send({ error: 'There is not device with provided id' });
        });
    }
    getDevicesTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield deviceService_1.default.readAssociationsById(req.params.deviceId);
            if (device.id) {
                return res.status(200).send({ data: device });
            }
            res.status(404).send({ error: 'There is not device with provided id' });
        });
    }
}
exports.default = new DevicesController();
