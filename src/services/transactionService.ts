import TransactionDA from '../dataAccess/transactions';
import SignTransactionInput from '../interfaces/transaction';
import { verifySignature } from '../helpers/index';

class TransactionService {
  async createTransaction(resource: SignTransactionInput) {
    return TransactionDA.addTransaction(resource);
  }
  async createSignature(resource: SignTransactionInput) {
    return TransactionDA.addTransaction(resource);
  }

  async verifySignedData(resource: SignTransactionInput) {
    return verifySignature(
      resource,
      resource.signature.publicKey,
      resource.signature.value
    );
  }
}

export default new TransactionService();
