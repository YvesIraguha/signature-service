export type status = 'ACTIVE' | 'DEACTIVATED';
export default interface CreateDeviceInput {
  publicKey: string;
  privateKey: string;
  signatureAlgorithm: string;
  transactionDataEncoding: string;
  numberOfSignedTransactions: number;
  id: string;
  description: string;
  status: status;
}
