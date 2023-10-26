import {Expose} from "class-transformer";

export class UserOutputDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    username: string;

    @Expose()
    isActive: boolean;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string
}