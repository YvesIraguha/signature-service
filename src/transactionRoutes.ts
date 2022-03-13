import { Router } from 'express';
import TransactionsController from './controllers/transactionsController';
import { asyncHandler } from './helpers';
import {
  validateTransactionSchema,
  validateSignedTransactionSchema
} from './middleware/validator';
import { checkSignatureDeviceExistence } from './middleware/checkSignatureDevice';
const routes: Router = Router();

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
  .post(
    validateTransactionSchema,
    checkSignatureDeviceExistence,
    asyncHandler(TransactionsController.signTransaction)
  );

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
  .post(
    validateSignedTransactionSchema,
    asyncHandler(TransactionsController.verifySignedTransaction)
  );

export default routes;
