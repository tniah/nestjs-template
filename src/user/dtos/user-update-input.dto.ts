import {IsBoolean, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class UserUpdateInputDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(6, 255)
    password: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}