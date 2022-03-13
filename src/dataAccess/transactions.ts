import { v4 as uuidv4 } from 'uuid';
import debug from 'debug';
import models from '../../models';

import SignTransactionInput from '../interfaces/transaction';
import deviceService from '../services/deviceService';
import { signData } from '../helpers';
import CreateDeviceInput from '../interfaces/createDevice';

const log: debug.IDebugger = debug('app:signature-device-da');

class TransactionDA {
  TransactionModel = models.Transaction;

  constructor() {
    log('Created a new instance of signature device DA');
  }

  async addTransaction(
    transactionFields: SignTransactionInput,
    deviceFields: CreateDeviceInput
  ) {
    const id = uuidv4();
    const transaction = {
      ...transactionFields,
      id
    };

    const {
      privateKey,
      publicKey,
      numberOfSignedTransactions: signedTx,
      signatureAlgorithm
    } = deviceFields;

    const signature = signData(transaction, privateKey);
    const numberOfSignedTransactions = signedTx + 1;
    await this.TransactionModel.create(transaction);
    await deviceService.putById(transactionFields.deviceId, {
      numberOfSignedTransactions
    });

    return {
      ...transaction,
      signature: {
        value: signature,
        publicKey,
        algorithm: signatureAlgorithm
      }
    };
  }
}

export default new TransactionDA();
