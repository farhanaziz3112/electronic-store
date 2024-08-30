export interface ProductPurchase {
    _id: string;
    purchaseId: string;
    productCode: string;
    quantity: number;
    pricePerItem: number;
    totalPrice: number;
    date: Date
  }
  