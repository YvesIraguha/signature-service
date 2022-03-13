"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const devicesController_1 = __importDefault(require("./controllers/devicesController"));
const helpers_1 = require("./helpers");
const validator_1 = require("./middleware/validator");
const routes = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *  schemas:
 *    Device:
 *      type: object
 *      required:
 *        - description
 *        - signatureAlgorithm
 *      properties:
 *        description:
 *          type: string
 *          description: label of the device for display in application
 *        status:
 *          type: string
 *          description: an indicator that the device is active or deactivated (inactive)
 *        signatureAlgorithm:
 *          type: string
 *          description: algorithm to use while signing transactions
 *        transactionDataEncoding:
 *          type: string
 *          description: encoding of transaction data for algorithm to properly identify what needs to be signed
 *        numberOfSignedTransactions:
 *          type: integer
 *          description: a counter of how many transactions have been signed with a given device
 *        publicKey:
 *          type: string
 *          description: second member of the key-pairs of this device to use while verifying the signature
 *      example:
 *        publicKey: implicitly generated key
 *        signatureAlgorithm: rsa | ecc
 *        transactionDataEncoding: UTF-8
 *        numberOfSignedTransactions: 15
 *        id: 123e4567-e89b-12d3-a456-426614174000
 *        description: rsa signature device
 *        status: ACTIVE
 *    Signature:
 *      type: object
 *      description: signature of a signed transaction
 *      properties:
 *        value:
 *          type: string
 *          description: actual signature of the transaction
 *        algorithm:
 *          type: string
 *          description: algorithm used to sign the transaction
 *        publicKey:
 *           type: string
 *           description: the public key which can be used to verify the signature
 *      example:
 *        value: HXGDJAA
 *        algorithm: rsa
 *        publicKey: HDkhad
 *    Transaction:
 *      type: object
 *      required:
 *        - number
 *        - deviceId
 *        - timeOfTransaction
 *        - place
 *        - price
 *        - currency
 *        - quantity
 *        - totalAmount
 *        - paymentMethod
 *        - item
 *      properties:
 *        id:
 *          type: UUID
 *          description: auto-generated UUID of a transaction
 *        number:
 *          type: integer
 *          description: transaction number
 *        deviceId:
 *          type: UUID
 *          description: the id of signature device to use while signing the transaction
 *        timeOfTransaction:
 *          type: Date
 *          description: time the transaction occurred
 *        currency:
 *          type: string
 *          description: the type of currency through which the transaction was done
 *        quantity:
 *          type: integer
 *          description: quantity of items in the transaction
 *        price:
 *          type: integer
 *          description: price per unit of the item
 *        totalAmount:
 *          type: integer
 *          description: Total amount of the transaction
 *        item:
 *          type: string
 *          description: description of the item or items under the transaction
 *        paymentMethod:
 *          type: string
 *          description: methods through which transfer of value (money) occurred
 *      example:
 *        number: 15
 *        timeOfTransaction: 2022-03-13T18:12:56.374Z
 *        place: Ruger Mall
 *        price: 300
 *        currency: Naira
 *        deviceId: 123e4567-e89b-12d3-a456-426614174000
 *        paymentMethod: Cash
 *        quantity: 3
 *        totalAmount: 900
 *        item: hair products
 *    ExtendedDevice:
 *      allOf:
 *        - $ref: '#/components/schemas/Device'
 *        - id:
 *            type: UUID
 *            description: auto-generated UUID of a device
 *            example: '123a4487-e89b-12d3-a456-426614174000'
 *        - type: object
 *          description: transactions signed by a given device
 *          properties:
 *            transactions:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Transaction'
 *
 *    SignedTransaction:
 *      allOf:
 *        - $ref: '#/components/schemas/Transaction'
 *        - id:
 *            type: UUID
 *            description: auto-generated UUID of a device
 *            example: '123a4487-e89b-12d3-a456-426614174000'
 *        - type: object
 *          description: transactions signed by a given device
 *          properties:
 *            signature:
 *              $ref: '#/components/schemas/Signature'
 *      example:
 *        allOf:
 *          - $ref: '#/components/schemas/Transaction/example'
 *          - id: '123a4487-e89b-12d3-a456-426614174000'
 *          - signature:
 *              $ref: '#/components/schemas/Signature/example'
 *
 */
/**
 * @swagger
 *  tags:
 *    name: Devices
 *    description: devices that can be used to sign a transaction
 */
/**
 * @swagger
 *
 * /devices:
 *  get:
 *    summary: Returns all devices
 *    tags: [Devices]
 *    responses:
 *      200:
 *        description: the list of all devices
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Device'
 *  post:
 *    summary: Create a new device
 *    tags: [Devices]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - description
 *            properties:
 *              description:
 *                type: string
 *                description: label of the device for display in application
 *    responses:
 *      201:
 *        description: The device was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Device'
 *      400:
 *        description: bad request (invalid input)
 *      500:
 *        description: Some server error
 */
routes
    .route('/devices')
    .get((0, helpers_1.asyncHandler)(devicesController_1.default.listDevices))
    .post(validator_1.validateDeviceSchema, (0, helpers_1.asyncHandler)(devicesController_1.default.createDevice));
/**
 * @swagger
 * /devices/{deviceId}:
 *   get:
 *     summary: gets device by id
 *     tags: [Devices]
 *     parameters:
 *       - in : path
 *         name: deviceId
 *         description: id of device
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: device by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       404:
 *         description: device with provided id doesn't exist
 *       500:
 *         description: some server error
 *   put:
 *     summary: update device by id
 *     tags: [Devices]
 *     parameters:
 *       - in : path
 *         name: deviceId
 *         description: id of a device to be updated
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              required:
 *                - description
 *              properties:
 *                description:
 *                  type: string
 *                  description: label of the device for display in application
 *     responses:
 *       201:
 *         description: device has been updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       400:
 *         description: Bad request (invalid input)
 *       404:
 *         description: device with provided id doesn't exist
 *       500:
 *         description: some error on the server happened
 *   patch:
 *     summary: patch device by id
 *     tags: [Devices]
 *     parameters:
 *       - in : path
 *         name: deviceId
 *         description: id of device
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *             properties:
 *               description:
 *                  type: string
 *                  description: description of signature service device
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       201:
 *         description: device has been patched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       400:
 *         description: Bad request (invalid input)
 *       404:
 *         description: device with provided id doesn't exist
 *       500:
 *         description: some error on the server happened
 *   delete:
 *     summary: delete device by id
 *     tags: [Devices]
 *     parameters:
 *       - in : path
 *         name: deviceId
 *         description: id of device
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: device deleted successfully
 *       404:
 *         description: device with provided id doesn't exist
 *       500:
 *         description: Some error on the server happened
 */
routes
    .route('/devices/:deviceId')
    .get(validator_1.validateUUIDSchema, (0, helpers_1.asyncHandler)(devicesController_1.default.getDeviceById))
    .delete(validator_1.validateUUIDSchema, (0, helpers_1.asyncHandler)(devicesController_1.default.removeDevice))
    .put(validator_1.validateUUIDSchema, validator_1.validateDeviceSchema, (0, helpers_1.asyncHandler)(devicesController_1.default.put))
    .patch(validator_1.validateUUIDSchema, validator_1.validateOptionDeviceSchema, (0, helpers_1.asyncHandler)(devicesController_1.default.put));
/**
 * @swagger
 * /devices/{deviceId}/transactions:
 *   get:
 *     summary: get transactions related to a device
 *     tags: [Transactions]
 *     parameters:
 *       - in : path
 *         name: deviceId
 *         description: id of device
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The device with associated transactions was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExtendedDevice'
 *       404:
 *         description: device with provided id doesn't exist
 *       500:
 *         description: some server error
 */
routes
    .route('/devices/:deviceId/transactions')
    .get(validator_1.validateUUIDSchema, (0, helpers_1.asyncHandler)(devicesController_1.default.getDevicesTransactions));
exports.default = routes;
