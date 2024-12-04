import { OrganizationType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateOrganizationDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsEnum(OrganizationType)
    type: OrganizationType;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;
}

