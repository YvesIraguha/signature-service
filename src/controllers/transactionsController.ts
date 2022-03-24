import { Request, Response } from 'express';
import debug from 'debug';
import TransactionService from '../services/transactionService';

const log: debug.IDebugger = debug('app:transaction-controller');

class TransactionsController {
  async signTransaction(req: Request, res: Response) {
    const signedTransaction = await TransactionService.createTransaction(
      req.body.transaction,
      req.body.signatureDevice
    );
    log('transaction signed');
    res.status(201).send({ data: signedTransaction });
  }

  async verifySignedTransaction(req: Request, res: Response) {
    const isAuthentic = await TransactionService.verifySignedData(
      req.body.transaction
    );
    log('verified');
    res.status(201).send({ data: { isAuthentic } });
  }
}

export default new TransactionsController();
