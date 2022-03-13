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
const uuid_1 = require("uuid");
const debug_1 = __importDefault(require("debug"));
const models_1 = __importDefault(require("../../models"));
const index_1 = require("../helpers/index");
const log = (0, debug_1.default)('app:signature-device-da');
class DeviceDA {
    constructor() {
        this.DeviceModel = models_1.default.Device;
        this.TxModel = models_1.default.Transaction;
        log('Created a new instance of  device DA');
    }
    addDevice(deviceFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const { publicKey, privateKey } = (0, index_1.generateKeyPair)();
            const device = Object.assign(Object.assign({}, deviceFields), { id,
                publicKey,
                privateKey, signatureAlgorithm: 'rsa', transactionDataEncoding: 'utf-8', status: 'ACTIVE', numberOfSignedTransactions: 0 });
            const newDevice = yield this.DeviceModel.create(device);
            return newDevice;
        });
    }
    getDeviceById(id, excludePrivateKey = true) {
        return __awaiter(this, void 0, void 0, function* () {
            log(id);
            return this.DeviceModel.findByPk(id, excludePrivateKey && {
                attributes: { exclude: ['privateKey'] }
            });
        });
    }
    getDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.DeviceModel.findAll({
                attributes: { exclude: ['privateKey'] }
            });
        });
    }
    updateDeviceById(id, deviceFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedDevice = yield this.DeviceModel.update(Object.assign({}, deviceFields), { returning: true, where: { id } });
            return updatedDevice;
        });
    }
    removeDeviceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.DeviceModel.destroy({ where: { id } });
        });
    }
    getDeviceWithTransactions(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.DeviceModel.findByPk(id, {
                include: { model: this.TxModel, as: 'transactions' },
                attributes: { exclude: ['privateKey'] }
            });
        });
    }
}
exports.default = new DeviceDA();
