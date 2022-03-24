import SignTransactionInput from './transaction';

export interface ITransactionDA {
  addTransaction: (transaction: SignTransactionInput) => Promise<any>;
}
