import {Injectable} from "@nestjs/common";
import {UserCreateInputDto} from "../dtos/user-create-input.dto";
import {UserOutputDto} from "../dtos/user-output.dto";
import {UserRepository} from "../repositories/user.repository";
import {plainToClass} from "class-transformer";
import {User} from "../entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        private repository: UserRepository,
    ) {
    }

    async createUser(
        input: UserCreateInputDto,
    ): Promise<UserOutputDto> {
        const user = plainToClass(User, input);
        await this.repository.save(user);
        return plainToClass(UserOutputDto, user, {
            excludeExtraneousValues: true,
        })

    }

    // async getUserById(id: number): Promise<UserOutputDto> {
    //
    // }
}