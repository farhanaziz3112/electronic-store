export interface Purchase {
  _id: string;
  customerId: string;
  totalPrice: number;
  quantity: number;
  date: Date;
  status: string;
}
