import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { IProduct } from '../interface/product.interface';

@Injectable()
export class ProductService {
  constructor(@InjectModel('products') private productModel: Model<IProduct>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<IProduct> {
    {
      const newProduct = await new this.productModel(createProductDto);
      return newProduct.save();
    }
  }

  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto
  ): Promise<IProduct> {
    {
      const existingProduct: any = await this.productModel.findByIdAndUpdate(
        productId,
        updateProductDto,
        {
          new: true,
        }
      );
      return existingProduct;
    }
  }

  async getAllProducts(): Promise<IProduct[]> {
    const productData = await this.productModel.find();
    if (!productData || productData.length == 0) {
      throw new NotFoundException('products data not found!');
    }
    return productData;
  }

  async getProduct(productId: string): Promise<IProduct> {
    const existingProduct = await this.productModel.findById(productId).exec();
    if (!existingProduct) {
      throw new NotFoundException(`product ${productId} not found`);
    }
    return existingProduct;
  }

  async getProductByCode(code: string): Promise<IProduct> {
    const existingProduct = await this.productModel.find({ code: code });
    if (!existingProduct) {
      throw new NotFoundException(`product ${code} not found`);
    }
    return existingProduct[0];
  }

  async deleteProduct(productId: string): Promise<IProduct> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new NotFoundException(`product #${productId} not found`);
    }
    return deletedProduct;
  }
}
