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
exports.verifySignature = exports.signData = exports.generateKeyPair = exports.validateData = exports.asyncHandler = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const asyncHandler = (fn) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fn(req, res);
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
});
exports.asyncHandler = asyncHandler;
const validateData = (data, schema) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.validateAsync(data);
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.validateData = validateData;
const convertDataToString = (data) => JSON.stringify(data);
const generateKeyPair = () => {
    const { publicKey, privateKey } = crypto_1.default.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: process.env.PASSPHRASE
        }
    });
    return { publicKey, privateKey };
};
exports.generateKeyPair = generateKeyPair;
const signData = (data, privateKey) => {
    const signature = crypto_1.default.sign('sha256', Buffer.from(convertDataToString(data), 'utf-8'), {
        key: privateKey,
        padding: crypto_1.default.constants.RSA_PKCS1_PSS_PADDING,
        passphrase: process.env.PASSPHRASE
    });
    return signature.toString('base64');
};
exports.signData = signData;
const verifySignature = (data, publicKey, signature) => {
    delete data['signature'];
    const isVerified = crypto_1.default.verify('sha256', Buffer.from(convertDataToString(data)), { key: publicKey, padding: crypto_1.default.constants.RSA_PKCS1_PSS_PADDING }, Buffer.from(signature, 'base64'));
    return isVerified;
};
exports.verifySignature = verifySignature;
