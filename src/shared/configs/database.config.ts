import * as process from "process";
import {registerAs} from "@nestjs/config";

export default registerAs('database', () => ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
}));

