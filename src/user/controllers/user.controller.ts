import {Body, Controller, Get, Post} from "@nestjs/common";
import {UserCreateInputDto} from "../dtos/user-create-input.dto";
import {UserService} from "../services/user.service";


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
    async getUsers() {
        return "This action return all user"
    }

    @Post()
    async createUser(@Body() input: UserCreateInputDto) {
        await this.userService.create(input);
        return 'This action adds a new user'
    }

}