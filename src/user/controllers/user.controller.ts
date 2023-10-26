import {Body, Controller, Get, Post} from "@nestjs/common";
import {UserCreateInputDto} from "../dtos/user-create-input.dto";


@Controller({
    path: 'users',
    version: ['1']
})
export class UserController {
    @Get()
    async getUsers() {
        return "This action return all user"
    }

    @Post()
    async createUser(@Body() input: UserCreateInputDto) {
        console.log(input)
        return 'This action adds a new user'
    }

}