import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPurchase } from '../interface/purchase.interface';
import { CreatePurchaseDto } from '../dto/purchase/create-purchase.dto';
import { UpdatePurchaseDto } from '../dto/purchase/update-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel('purchases') private purchaseModel: Model<IPurchase>
  ) {}

  async createPurchase(
    createPurchaseDto: CreatePurchaseDto
  ): Promise<IPurchase> {
    {
      const newPurchase = await new this.purchaseModel(createPurchaseDto);
      return newPurchase.save();
    }
  }

  async updatePurchase(
    purchaseId: string,
    updatePurchaseDto: UpdatePurchaseDto
  ): Promise<IPurchase> {
    {
      const existingPurchase: any = await this.purchaseModel.findByIdAndUpdate(
        purchaseId,
        updatePurchaseDto,
        {
          new: true,
        }
      );
      return existingPurchase;
    }
  }

  async getAllPurchases(): Promise<IPurchase[]> {
    const purchaseData = await this.purchaseModel.find();
    if (!purchaseData || purchaseData.length == 0) {
      throw new NotFoundException('purchases data not found!');
    }
    return purchaseData;
  }

  async getPurchase(purchaseId: string): Promise<IPurchase> {
    const existingPurchase = await this.purchaseModel
      .findById(purchaseId)
      .exec();
    if (!existingPurchase) {
      throw new NotFoundException(`purchase ${purchaseId} not found`);
    }
    return existingPurchase;
  }

  async getPurchasesByStatus(status: string): Promise<IPurchase[]> {
    const purchases = await this.purchaseModel
      .find({ status: status })
      .exec();
    if (!purchases) {
      throw new NotFoundException(`purchase ${status} not found`);
    }
    return purchases;
  }

  async deletePurchase(purchaseId: string): Promise<IPurchase> {
    const deletedPurchase = await this.purchaseModel.findByIdAndDelete(
      purchaseId
    );
    if (!deletedPurchase) {
      throw new NotFoundException(`purchase #${purchaseId} not found`);
    }
    return deletedPurchase;
  }
}
