import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPurchaseDto } from './create-productpurchase.dto';

export class UpdateProductPurchaseDto extends PartialType(CreateProductPurchaseDto) {}
