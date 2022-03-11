import TransactionDA from '../dataAccess/transactions';
import SignTransactionInput, { Transaction } from '../interfaces/transaction';
import { verifySignature } from '../helpers/index';
import CreateDeviceInput from '../interfaces/createDevice';

class TransactionService {
  async createTransaction(
    transactionInput: SignTransactionInput,
    signingDevice: CreateDeviceInput
  ) {
    return TransactionDA.addTransaction(transactionInput, signingDevice);
  }
  async createSignature(
    transactionInput: SignTransactionInput,
    signingDevice: CreateDeviceInput
  ) {
    return TransactionDA.addTransaction(transactionInput, signingDevice);
  }

  async verifySignedData(resource: Transaction) {
    return verifySignature(
      resource,
      resource.signature.publicKey,
      resource.signature.value
    );
  }
}

export default new TransactionService();
