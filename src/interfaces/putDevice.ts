export default interface PutDeviceInput {
  transactionDataEncoding?: string;
  numberOfSignedTransactions?: number;
  id?: string;
  description?: string;
  status?: string;
}
