import {ValidationError} from "class-validator";
import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";

@Catch()
export class ValidationExceptionsFilter<T> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost): any {
        console.log(exception)
    }

}