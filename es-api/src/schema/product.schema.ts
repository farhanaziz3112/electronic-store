
/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection: 'products'})
export class Product {

    @Prop()
    _id!: String;

    @Prop()
    name!: String;

    @Prop()
    category!: String;

    @Prop()
    salePrice!: number;

    @Prop()
    description!: String;

    @Prop()
    image!: String;

    @Prop()
    code!: String;

    @Prop()
    rating!: number

    @Prop()
    quantity!: number

    @Prop()
    inventoryStatus!: String

    @Prop()
    sold!: number

    @Prop()
    revenue!: number

    @Prop()
    brand!: String
}

export const ProductSchema = SchemaFactory.createForClass(Product);