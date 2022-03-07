export default interface CreateDeviceInput {
  id: string;
  publicKey: string;
  label: string;
  signedTransactions: number;
}
