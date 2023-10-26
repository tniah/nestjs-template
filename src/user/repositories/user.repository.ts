import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import {User} from "../entities/user.entity";
import {UserCreateInputDto} from "../dtos/user-create-input.dto";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async getById(id: number): Promise<User> {
        return await this.findOne({where: {id}})
    }

    // async create(userCreateDto: UserCreateInputDto): Promise<User> {
    //     return this.save(userCreateDto);
    // }
}