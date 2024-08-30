/* eslint-disable @typescript-eslint/ban-types */

import { Document } from "mongoose";

export interface IProduct extends Document {
    readonly _id: String;
    readonly name: String;
    readonly category: String;
    readonly salePrice: number;
    readonly description: String;
    readonly image: String;
    readonly code: String;
    readonly rating: number;
    readonly quantity: number;
    readonly inventoryStatus: String;
    readonly sold: number;
    readonly revenue: number;
    readonly brand: String;
}