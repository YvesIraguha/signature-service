import TransactionDA from "../dataAccess/transactions";
import SignTransactionInput from "../interfaces/transaction";
import deviceService from "./deviceService";

class TransactionService {
  async createTransaction(resource: SignTransactionInput) {
    return TransactionDA.addTransaction(resource);
  }
  async createSignature(resource: SignTransactionInput) {
    const transaction = await this.createTransaction(resource);
    const signatureDevice = await deviceService.readById(transaction.deviceId);
    // const signature = await createSignatureOfTransactions();

    // updateCounter;

    return {
      ...transaction,
      signatureDevice,
    };
  }
}

export default new TransactionService();
