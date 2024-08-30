/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */

import { Document } from 'mongoose';

export interface IPurchase extends Document {
  readonly _id: String;
  readonly customerId: String;
  readonly totalPrice: number;
  readonly quantity: number;
  readonly date: Date;
  readonly status: String;
}
