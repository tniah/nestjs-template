import {Module} from "@nestjs/common";
import {UserController} from "./controllers/user.controller";
import {UserService} from "./services/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {UserRepository} from "./repositories/user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserRepository],
    controllers: [UserController],
    exports: [UserService],
})

export class UserModule {
}