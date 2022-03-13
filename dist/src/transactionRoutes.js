"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionsController_1 = __importDefault(require("./controllers/transactionsController"));
const helpers_1 = require("./helpers");
const validator_1 = require("./middleware/validator");
const checkSignatureDevice_1 = require("./middleware/checkSignatureDevice");
const routes = (0, express_1.Router)();
/**
 * @swagger
 * /sign-tx:
 *   post:
 *     summary: sign transaction
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transaction
 *             properties:
 *               transaction:
 *                 $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: The transaction has been signed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: bad input (bad request).
 *       404:
 *         description: signature device not found.
 *       500:
 *         description: error on the server happened.
 *
 */
routes
    .route('/sign-tx')
    .post(validator_1.validateTransactionSchema, checkSignatureDevice_1.checkSignatureDeviceExistence, (0, helpers_1.asyncHandler)(transactionsController_1.default.signTransaction));
/**
 * @swagger
 * /verify-tx:
 *   post:
 *     summary: verify signed transaction
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transaction
 *             properties:
 *               transaction:
 *                 $ref: '#/components/schemas/SignedTransaction'
 *     responses:
 *       201:
 *         description: The transaction has been verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: a flag indicating whether a given transaction signature was signed by a given device
 *               properties:
 *                 isAuthentic:
 *                    type: boolean
 *                    description: indicates if signature is authentic or not
 *
 *       400:
 *         description: bad input (bad request).
 *       404:
 *         description: signature device not found.
 *       500:
 *         description: error on the server happened.
 *
 */
routes
    .route('/verify-tx')
    .post(validator_1.validateSignedTransactionSchema, (0, helpers_1.asyncHandler)(transactionsController_1.default.verifySignedTransaction));
exports.default = routes;
