import debug from 'debug';
import models from '../../models';
import SignTransactionInput from '../interfaces/transaction';
import { ITransactionDA } from '../interfaces/ITransactionDA';

const log: debug.IDebugger = debug('app:signature-device-da');

export class TransactionDA implements ITransactionDA {
  TransactionModel: any;
  constructor(transactionModel: any) {
    log('Created a new instance of signature device DA');
    this.TransactionModel = transactionModel;
  }

  async addTransaction(transaction: SignTransactionInput) {
    const createdTransaction = await this.TransactionModel.create(transaction);
    return createdTransaction;
  }
}

export default new TransactionDA(models.Transaction);
