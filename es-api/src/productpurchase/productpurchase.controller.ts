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
import { CreateProductPurchaseDto } from '../dto/productpurchase/create-productpurchase.dto';
import { UpdateProductPurchaseDto } from '../dto/productpurchase/update-productpurchase.dto';
import { ProductPurchaseService } from './productpurchase.service';

@Controller('productpurchases')
export class ProductPurchaseController {
  constructor(private readonly productPurchaseService: ProductPurchaseService) {}

  @Post()
  async createProductPurchase(
    @Res() response: any,
    @Body() createProductPurchaseDto: CreateProductPurchaseDto
  ) {
    try {
      const newProductPurchase = await this.productPurchaseService.createProductPurchase(
        createProductPurchaseDto
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Product Purchase has been created successfully',
        newProductPurchase,
      });
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product Purchase not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateProductPurchase(
    @Res() response: any,
    @Param('id') productPurchaseId: string,
    @Body() updateProductPurchaseDto: UpdateProductPurchaseDto
  ) {
    try {
      const existingProductPurchase = await this.productPurchaseService.updateProductPurchase(
        productPurchaseId,
        updateProductPurchaseDto
      );
      return response.status(HttpStatus.OK).json({
        message: 'Product Purchase has been successfully updated',
        existingProductPurchase,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getProductPurchases(@Res() response: any) {
    try {
      const productPurchasesData = await this.productPurchaseService.getAllProductPurchases();
      return response.status(HttpStatus.OK).json({
        message: 'All product purchases data found successfully',
        productPurchasesData,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getProductPurchase(@Res() response: any, @Param('id') productPurchaseId: string) {
    try {
      const existingProductPurchase = await this.productPurchaseService.getProductPurchase(productPurchaseId);
      return response.status(HttpStatus.OK).json({
        message: 'Product Purchase found successfully',
        existingProductPurchase,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/code/:id')
  async getProductPurchaseByCode(@Res() response: any, @Param('id') productCode: string) {
    try {
      const productPurchasesData = await this.productPurchaseService.getProductPurchaseByCode(productCode);
      return response.status(HttpStatus.OK).json({
        message: 'Product Purchase found successfully',
        productPurchasesData,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/purchase/:id')
  async getProductPurchaseByPurchaseId(@Res() response: any, @Param('id') purchaseId: string) {
    try {
      const productPurchasesData = await this.productPurchaseService.getProductPurchaseByPurchaseId(purchaseId);
      return response.status(HttpStatus.OK).json({
        message: 'Product Purchase found successfully',
        productPurchasesData,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteProductPurchase(@Res() response: any, @Param('id') productPurchaseId: string) {
    try {
      const deletedProductPurchase = await this.productPurchaseService.deleteProductPurchase(productPurchaseId);
      return response.status(HttpStatus.OK).json({
        message: 'Product deleted successfully',
        deletedProductPurchase,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }
}
