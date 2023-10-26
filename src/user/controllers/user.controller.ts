import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query} from "@nestjs/common";
import {UserCreateInputDto} from "../dtos/user-create-input.dto";
import {UserService} from "../services/user.service";
import {UserOutputDto} from "../dtos/user-output.dto";
import {BaseApiResponseDto} from "../../shared/dtos/base-api-response.dto";
import {PaginationParamsDto} from "../../shared/dtos/pagination-params.dto";
import {UserUpdateInputDto} from "../dtos/user-update-input.dto";


@Controller({
    path: 'users',
    version: ['1']
})
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Get()
    async getUsers(
        @Query() query: PaginationParamsDto,
    ): Promise<BaseApiResponseDto<UserOutputDto[]>> {
        const {users, count} = await this.userService.getUsers(query.limit, query.offset);
        return {data: users, meta: {count}};
    }

    @Post()
    @HttpCode(201)
    async createUser(
        @Body() input: UserCreateInputDto,
    ): Promise<BaseApiResponseDto<UserOutputDto>> {
        const user = await this.userService.createUser(input);
        return {'data': user, 'meta': {}};
    }

    @Get(':id')
    async getUser(
        @Param('id') id: number
    ): Promise<BaseApiResponseDto<UserOutputDto>> {
        const user = await this.userService.getUserById(id);
        return {data: user, meta: {}};
    }

    @Patch(':id')
    async updateUser(
        @Param('id') id: number,
        @Body() input: UserUpdateInputDto,
    ): Promise<BaseApiResponseDto<UserOutputDto>> {
        const user = await this.userService.updateUser(id, input);
        return {data: user, meta: {}};
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(
        @Param('id') id: number
    ): Promise<void> {
        return this.userService.deleteUserById(id);
    }
}