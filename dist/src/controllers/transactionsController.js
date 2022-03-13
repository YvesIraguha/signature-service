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
const transactionService_1 = __importDefault(require("../services/transactionService"));
const log = (0, debug_1.default)('app:transaction-controller');
class TransactionsController {
    signTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const signedTransaction = yield transactionService_1.default.createSignature(req.body.transaction, req.body.signatureDevice);
            log('transaction signed');
            res.status(201).send({ data: signedTransaction });
        });
    }
    verifySignedTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isAuthentic = yield transactionService_1.default.verifySignedData(req.body.transaction);
            log('verified');
            res.status(201).send({ data: { isAuthentic } });
        });
    }
}
exports.default = new TransactionsController();
