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
import { CreatePurchaseDto } from '../dto/purchase/create-purchase.dto';
import { UpdatePurchaseDto } from '../dto/purchase/update-purchase.dto';
import { PurchaseService } from './purchase.service';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async createPurchase(
    @Res() response: any,
    @Body() createPurchaseDto: CreatePurchaseDto
  ) {
    try {
      const newPurchase = await this.purchaseService.createPurchase(
        createPurchaseDto
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Purchase has been created successfully',
        newPurchase,
      });
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Purchase not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updatePurchase(
    @Res() response: any,
    @Param('id') purchaseId: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto
  ) {
    try {
      const existingPurchase = await this.purchaseService.updatePurchase(
        purchaseId,
        updatePurchaseDto
      );
      return response.status(HttpStatus.OK).json({
        message: 'Purchase has been successfully updated',
        existingPurchase,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getPurchases(@Res() response: any) {
    try {
      const purchaseData = await this.purchaseService.getAllPurchases();
      return response.status(HttpStatus.OK).json({
        message: 'All Purchases data found successfully',
        purchaseData,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getPurchase(@Res() response: any, @Param('id') PurchaseId: string) {
    try {
      const existingPurchase = await this.purchaseService.getPurchase(PurchaseId);
      return response.status(HttpStatus.OK).json({
        message: 'Purchase found successfully',
        existingPurchase,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/status/:id')
  async getPurchasesByStatus(@Res() response: any, @Param('id') status: string) {
    try {
      const purchases = await this.purchaseService.getPurchasesByStatus(status);
      return response.status(HttpStatus.OK).json({
        message: 'Purchase found successfully',
        purchases,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deletePurchase(@Res() response: any, @Param('id') PurchaseId: string) {
    try {
      const deletedPurchase = await this.purchaseService.deletePurchase(PurchaseId);
      return response.status(HttpStatus.OK).json({
        message: 'Purchase deleted successfully',
        deletedPurchase,
      });
    } catch (err: any) {
      console.log(err);
      return response.status(err.status).json(err.response);
    }
  }
}
