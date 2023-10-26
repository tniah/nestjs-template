import {IsAlphanumeric, IsNotEmpty, IsString, Length} from "class-validator";

export class UserCreateInputDto {
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    username: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 255)
    password: string;
}