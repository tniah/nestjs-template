import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from "./user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import databaseConfig from "./shared/configs/database.config";
import {OpenTelemetryModuleConfig} from "./shared/opentelemetry/tracer.module";


@Module({
    imports: [
        OpenTelemetryModuleConfig,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig]
        }),
        UserModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                ...configService.get('database'),
                autoLoadEntities: true
            }),
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
