import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    organization_id?: number;

}
