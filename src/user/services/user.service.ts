import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {UserCreateInputDto} from "../dtos/user-create-input.dto";
import {UserOutputDto} from "../dtos/user-output.dto";
import {UserRepository} from "../repositories/user.repository";
import {plainToClass} from "class-transformer";
import {User} from "../entities/user.entity";
import {hash} from "bcrypt";
import {UserUpdateInputDto} from "../dtos/user-update-input.dto";

@Injectable()
export class UserService {
    constructor(
        private repository: UserRepository,
    ) {
    }

    async getUsers(
        limit: number,
        offset: number,
    ): Promise<{ users: UserOutputDto[], count: number }> {
        const [users, count] = await this.repository.findAndCount({
            where: {},
            take: limit,
            skip: offset
        })

        const usersOutput = plainToClass(UserOutputDto, users, {
            excludeExtraneousValues: true,
        });
        return {users: usersOutput, count};
    }

    async createUser(
        input: UserCreateInputDto,
    ): Promise<UserOutputDto> {
        const user = plainToClass(User, input);

        const isExisting = await this.repository.exist({where: {username: user.username}});
        if (isExisting) {
            throw new BadRequestException('Username has already been taken');
        }

        user.password = await hash(input.password, 10);
        await this.repository.save(user);

        return plainToClass(UserOutputDto, user, {
            excludeExtraneousValues: true,
        })

    }

    async getUserById(id: number): Promise<UserOutputDto> {
        const user = await this.repository.getById(id);
        if (!user) {
            throw new NotFoundException('No user found with this ID')
        }

        return plainToClass(UserOutputDto, user, {
            excludeExtraneousValues: true,
        })
    }

    async updateUserById(id: number, input: UserUpdateInputDto): Promise<UserOutputDto> {
        const user = await this.repository.getById(id);
        if (!user) {
            throw new NotFoundException('No user found with this ID')
        }

        if (input.password) {
            input.password = await hash(input.password, 10);
        }

        const updatedUser: User = {
            ...user,
            ...plainToClass(User, input),
        };
        await this.repository.save(updatedUser);

        return plainToClass(UserOutputDto, updatedUser, {
            excludeExtraneousValues: true,
        });
    }

    async deleteUserById(id: number): Promise<void> {
        const user = await this.repository.getById(id);
        if (user) {
            await this.repository.remove(user);
        }
    }
}