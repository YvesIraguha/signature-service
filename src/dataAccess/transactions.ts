import { v4 as uuidv4 } from 'uuid';
import debug from 'debug';
import models from '../../models';

import SignTransactionInput from '../interfaces/transaction';

const log: debug.IDebugger = debug('app:signature-device-da');

class TransactionDA {
  TransactionModel = models.Transaction;

  constructor() {
    log('Created a new instance of signature device DA');
  }

  async addTransaction(transactionFields: SignTransactionInput) {
    const id = uuidv4();
    log(typeof id, typeof transactionFields.deviceId);
    const transaction = {
      ...transactionFields,
      id
    };
    const newTransaction = await this.TransactionModel.create(transaction);
    return newTransaction;
  }
}

export default new TransactionDA();
