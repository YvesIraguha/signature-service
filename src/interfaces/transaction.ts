interface Item {
  type: string;
  quantity: string;
  pricePerUnit: string;
  totalAmount: string;
}

interface Signature {
  value: string;
  algorithm: string;
  publicKey: string;
}
export interface Transaction extends SignTransactionInput {
  signature: Signature;
}

export default interface SignTransactionInput {
  number: number;
  deviceId: string;
  timeOfTransaction: Date;
  place: string;
  price: number;
  currency: string;
  paymentMethod: string;
  item: string;
  id: string;
}
