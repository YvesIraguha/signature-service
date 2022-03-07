export default interface PutDeviceInput {
  _id: string;
  publicKey: string;
  label: string;
  signedTransactions: number;
}
