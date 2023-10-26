import {IsNumber, IsOptional, Max, Min} from "class-validator";
import {Transform} from 'class-transformer';

export class PaginationParamsDto {
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(100)
    @Transform(({value}) => parseInt(value, 10), {toClassOnly: true})
    limit: number = 50;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Transform(({value}) => parseInt(value, 10), {toClassOnly: true})
    offset: number = 0;
}