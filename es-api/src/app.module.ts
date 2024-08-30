/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductSchema } from './schema/product.schema';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { PurchaseSchema } from './schema/purchase.schema';
import { PurchaseController } from './purchase/purchase.controller';
import { PurchaseService } from './purchase/purchase.service';
import { ProductPurchaseSchema } from './schema/productpurchase.schema';
import { ProductPurchaseController } from './productpurchase/productpurchase.controller';
import { ProductPurchaseService } from './productpurchase/productpurchase.service';

const uri =
  'mongodb+srv://farhanaziz3112:EfbA00fVDwihWf3K@electronic-store.lzwsyjs.mongodb.net/electronic-store?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    MongooseModule.forFeature([
      {
        name: 'products',
        schema: ProductSchema,
      },
      {
        name: 'purchases',
        schema: PurchaseSchema,
      },
      {
        name: 'product purchase',
        schema: ProductPurchaseSchema,
      },
    ]),
  ],
  controllers: [AppController, ProductController, PurchaseController, ProductPurchaseController],
  // eslint-disable-next-line prettier/prettier
  providers: [AppService, ProductService, PurchaseService, ProductPurchaseService],
})
export class AppModule {}
