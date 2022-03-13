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
const deviceService_1 = __importDefault(require("../services/deviceService"));
const helpers_1 = require("../helpers");
const log = (0, debug_1.default)('app:signature-device-da');
class TransactionDA {
    constructor() {
        this.TransactionModel = models_1.default.Transaction;
        log('Created a new instance of signature device DA');
    }
    addTransaction(transactionFields, deviceFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const transaction = Object.assign(Object.assign({}, transactionFields), { id });
            const { privateKey, publicKey, numberOfSignedTransactions: signedTx } = deviceFields;
            const signature = (0, helpers_1.signData)(transaction, privateKey);
            const numberOfSignedTransactions = signedTx + 1;
            yield this.TransactionModel.create(transaction);
            yield deviceService_1.default.putById(transactionFields.deviceId, {
                numberOfSignedTransactions
            });
            return Object.assign(Object.assign({}, transaction), { signature: {
                    value: signature,
                    publicKey,
                    algorithm: 'rsa'
                } });
        });
    }
}
exports.default = new TransactionDA();
