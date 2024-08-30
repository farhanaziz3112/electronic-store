/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { ProductService } from '../product/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Res() response: any,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      const newProduct =
        await this.productService.createProduct(createProductDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Product has been created successfully',
        newProduct,
      });
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateProduct(
    @Res() response: any,
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const existingProduct = await this.productService.updateProduct(
        productId,
        updateProductDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Product has been successfully updated',
        existingProduct,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getProducts(@Res() response: any) {
    try {
      const productData = await this.productService.getAllProducts();
      return response.status(HttpStatus.OK).json({
        message: 'All products data found successfully',
        productData,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getProduct(@Res() response: any, @Param('id') productId: string) {
    try {
      const existingProduct = await this.productService.getProduct(productId);
      return response.status(HttpStatus.OK).json({
        message: 'Product found successfully',
        existingProduct,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Get('code/:id')
  async getProductByCode(@Res() response: any, @Param('id') code: string) {
    try {
      const existingProduct = await this.productService.getProduct(code);
      return response.status(HttpStatus.OK).json({
        message: 'Product found successfully',
        existingProduct,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteProduct(@Res() response: any, @Param('id') productId: string) {
    try {
      const deletedProduct = await this.productService.deleteProduct(productId);
      return response.status(HttpStatus.OK).json({
        message: 'Product deleted successfully',
        deletedProduct,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }
}
