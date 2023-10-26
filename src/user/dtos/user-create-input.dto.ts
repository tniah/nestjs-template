import {IsNotEmpty} from "class-validator";

export class UserCreateInputDto {
    @IsNotEmpty()
    username: string;
    name: string;
    password: string;
    gender: string;
}