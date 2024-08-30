
/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection: 'product purchase'})
export class ProductPurchase {

    @Prop()
    _id!: String;

    @Prop()
    purchaseId!: String;

    @Prop()
    productCode!: String;

    @Prop()
    quantity!: number;

    @Prop()
    pricePerItem!: number;

    @Prop()
    totalPrice!: number;

    @Prop()
    date!: Date;

}

export const ProductPurchaseSchema = SchemaFactory.createForClass(ProductPurchase);