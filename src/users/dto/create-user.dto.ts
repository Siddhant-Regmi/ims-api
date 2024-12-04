import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(15)
    mobile: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsNotEmpty()
    @IsNumber()
    organization_id: number;

    @IsOptional()
    @IsNumber()
    role_id: number;
}
