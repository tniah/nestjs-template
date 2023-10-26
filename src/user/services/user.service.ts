import {Injectable} from "@nestjs/common";
import {UserCreateInputDto} from "../dtos/user-create-input.dto";

@Injectable()
export class UserService {
    async create(
        input: UserCreateInputDto,
    ) {
        console.log("Hello user service");
    }
}