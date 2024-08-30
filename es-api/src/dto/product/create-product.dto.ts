
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class CreateProductDto {

    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly _id!: string;
    
    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly name!: string;

    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly category!: string;

    @IsNumber()
    @IsNotEmpty()
    readonly salePrice!: number;

    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly description!: string;

    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly image!: string;

    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly code!: string;

    @IsNumber()
    @IsNotEmpty()
    readonly rating!: number;

    @IsNumber()
    @IsNotEmpty()
    readonly quantity!: number;

    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly inventoryStatus!: string;

    @IsNumber()
    @IsNotEmpty()
    readonly sold!: number;

    @IsNumber()
    @IsNotEmpty()
    readonly revenue!: number;

    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly brand!: string;
}