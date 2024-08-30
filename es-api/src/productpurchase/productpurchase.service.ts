
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductPurchaseDto } from '../dto/productpurchase/create-productpurchase.dto';
import { UpdateProductPurchaseDto } from '../dto/productpurchase/update-productpurchase.dto';
import { IProductPurchase } from '../interface/productpurchase.interface';

@Injectable()
export class ProductPurchaseService {
  constructor(@InjectModel('product purchase') private productPurchaseModel: Model<IProductPurchase>) {}

  async createProductPurchase(createProductPurchaseDto: CreateProductPurchaseDto): Promise<IProductPurchase> {
    {
      const newProductPurchase = await new this.productPurchaseModel(createProductPurchaseDto);
      return newProductPurchase.save();
    }
  }

  async updateProductPurchase(
    productPurchaseId: string,
    updateProductPurchaseDto: UpdateProductPurchaseDto,
  ): Promise<IProductPurchase> {
    {
      const existingProductPurchase: any = await this.productPurchaseModel.findByIdAndUpdate(
        productPurchaseId,
        updateProductPurchaseDto,
        {
          new: true,
        },
      );
      return existingProductPurchase;
    }
  }

  async getAllProductPurchases(): Promise<IProductPurchase[]> {
    const productPurchaseData = await this.productPurchaseModel.find();
    if (!productPurchaseData || productPurchaseData.length == 0) {
      throw new NotFoundException('product purchases data not found!');
    }
    return productPurchaseData;
  }

  async getProductPurchase(productPurchaseId: string): Promise<IProductPurchase> {
    const existingProductPurchase = await this.productPurchaseModel.findById(productPurchaseId).exec();
    if (!existingProductPurchase) {
      throw new NotFoundException(`product purchase ${productPurchaseId} not found`);
    }
    return existingProductPurchase;
  }

  async getProductPurchaseByCode(productCode: string): Promise<IProductPurchase[]> {
    const existingproductPurchases = await this.productPurchaseModel.find({productCode: productCode});
    if (!existingproductPurchases) {
      throw new NotFoundException(`product purchases with product code: ${productCode} not found`);
    }
    return existingproductPurchases;
  }

  async getProductPurchaseByPurchaseId(purchaseId: string): Promise<IProductPurchase[]> {
    const existingproductPurchases = await this.productPurchaseModel.find({purchaseId: purchaseId});
    if (!existingproductPurchases) {
      throw new NotFoundException(`product purchases with product code: ${purchaseId} not found`);
    }
    return existingproductPurchases;
  }

  async deleteProductPurchase(productPurchaseId: string): Promise<IProductPurchase> {
    const deletedProductPurchase = await this.productPurchaseModel.findByIdAndDelete(productPurchaseId);
    if (!deletedProductPurchase) {
      throw new NotFoundException(`product purchase #${productPurchaseId} not found`);
    }
    return deletedProductPurchase;
  }
}
