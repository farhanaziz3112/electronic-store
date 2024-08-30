import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateProductPurchaseDto {
  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  readonly _id!: string;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  readonly purchaseId!: string;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  readonly productCode!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly pricePerItem!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly totalPrice!: number;

  @IsNotEmpty()
  readonly date!: Date;
}
