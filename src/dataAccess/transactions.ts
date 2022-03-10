import { v4 as uuidv4 } from 'uuid';
import debug from 'debug';
import models from '../../models';

import SignTransactionInput from '../interfaces/transaction';
import deviceService from '../services/deviceService';
import { signData } from '../helpers';

const log: debug.IDebugger = debug('app:signature-device-da');

class TransactionDA {
  TransactionModel = models.Transaction;

  constructor() {
    log('Created a new instance of signature device DA');
  }

  async addTransaction(transactionFields: SignTransactionInput) {
    const id = uuidv4();
    const transaction = {
      ...transactionFields,
      id
    };

    const { privateKey, publicKey, numberOfSignedTransactions } =
      await deviceService.readById(transactionFields.deviceId);

    const signature = signData(transaction, privateKey);
    await this.TransactionModel.create(transaction);
    await deviceService.putById(
      transactionFields.deviceId,
      numberOfSignedTransactions + 1
    );
    return {
      ...transaction,
      signature: {
        value: signature,
        publicKey,
        algorithm: 'rsa'
      }
    };
  }
}

export default new TransactionDA();
