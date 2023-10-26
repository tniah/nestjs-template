import {Module} from "@nestjs/common";
import {APP_FILTER} from "@nestjs/core";
import {ValidationExceptionsFilter} from "./filters/validation-exceptions.filter";

@Module({
    providers: [
        {
            provide: APP_FILTER,
            useClass: ValidationExceptionsFilter
        }
    ]
})

export class SharedModule {
}