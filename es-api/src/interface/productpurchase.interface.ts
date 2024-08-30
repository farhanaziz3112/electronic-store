/* eslint-disable @typescript-eslint/ban-types */

import { Document } from "mongoose";

export interface IProductPurchase extends Document {
    readonly _id: String;
    readonly purchaseId: String;
    readonly productCode: String;
    readonly quantity: number;
    readonly pricePerItem: number;
    readonly totalPrice: number;
    readonly date: Date;
}