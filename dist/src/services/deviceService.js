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
const devices_1 = __importDefault(require("../dataAccess/devices"));
class DevicesService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return devices_1.default.addDevice(resource);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return devices_1.default.removeDeviceById(id);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return devices_1.default.getDevices();
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return devices_1.default.updateDeviceById(id, resource);
        });
    }
    readById(id, excludePrivateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return devices_1.default.getDeviceById(id, excludePrivateKey);
        });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return devices_1.default.updateDeviceById(id, resource);
        });
    }
    readAssociationsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return devices_1.default.getDeviceWithTransactions(id);
        });
    }
}
exports.default = new DevicesService();
