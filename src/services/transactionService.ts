import { v4 as uuidv4 } from 'uuid';
import TransactionDAInstance, {
  TransactionDA
} from '../dataAccess/transactions';
import SignTransactionInput, { Transaction } from '../interfaces/transaction';
import { verifySignature } from '../helpers/index';
import CreateDeviceInput from '../interfaces/createDevice';
import { signData } from '../helpers';
import DeviceDAInstance, { DeviceDA } from '../dataAccess/devices';

class TransactionService {
  transactionDataAccess: TransactionDA;
  devicesDataAccess: DeviceDA;

  constructor(txDataAccess: TransactionDA, dvDataAccess: DeviceDA) {
    this.transactionDataAccess = txDataAccess;
    this.devicesDataAccess = dvDataAccess;
  }
  async createTransaction(
    transactionInput: SignTransactionInput,
    signingDevice: CreateDeviceInput
  ) {
    const id = uuidv4();
    const transaction = {
      ...transactionInput,
      id
    };
    const { privateKey, publicKey, signatureAlgorithm } = signingDevice;
    const signature = await this.createSignature(transaction, privateKey);
    await this.transactionDataAccess.addTransaction(transaction);
    await this.devicesDataAccess.updateNumberOfSignedTransactions(
      transactionInput.deviceId
    );

    return {
      ...transaction,
      signature: {
        value: signature,
        publicKey,
        algorithm: signatureAlgorithm
      }
    };
  }

  async createSignature(transaction: any, privateKey: string) {
    const signature = signData(transaction, privateKey);
    return signature;
  }

  async verifySignedData(resource: Transaction) {
    return verifySignature(
      resource,
      resource.signature.publicKey,
      resource.signature.value
    );
  }
}

export default new TransactionService(TransactionDAInstance, DeviceDAInstance);
