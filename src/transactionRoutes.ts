import { Router } from 'express';
import TransactionsController from './controllers/transactionsController';
import { asyncHandler } from './helpers';
import { validateTransactionSchema } from './middleware/validator';
const routes: Router = Router();

/**
 * @swagger
 * /sign-tx:
 *   post:
 *     summary: sign transaction
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: transaction id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
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
    asyncHandler(TransactionsController.signTransaction)
  );
routes
  .route('/verify-tx')
  .post(
    validateTransactionSchema,
    asyncHandler(TransactionsController.verifySignedTransaction)
  );

export default routes;
