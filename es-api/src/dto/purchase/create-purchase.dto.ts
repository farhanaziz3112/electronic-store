import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePurchaseDto {
  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  readonly _id!: string;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  readonly customerId!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly totalPrice!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity!: number;

  @IsNotEmpty()
  readonly date!: Date;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  readonly status!: string;
}
