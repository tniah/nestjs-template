import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {VALIDATION_PIPE_OPTIONS} from "./shared/constants/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS))
    await app.listen(3000);
}

bootstrap();
