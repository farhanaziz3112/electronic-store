
/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection: 'purchases'})
export class Purchase {

    @Prop()
    _id!: String;

    @Prop()
    customerId!: String;

    @Prop()
    totalPrice!: number;

    @Prop()
    quantity!: number;

    @Prop()
    date!: Date;

    @Prop()
    status!: String;

}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);