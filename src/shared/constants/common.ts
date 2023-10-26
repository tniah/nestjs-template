import {VersioningType} from "@nestjs/common";
import {ValidationError} from "class-validator";

export const VALIDATION_PIPE_OPTIONS = {
    transform: true,
    whitelist: true,
    disableErrorMessages: false,
};

export const API_VERSIONING_OPTIONS = {
    type: VersioningType.URI,
};