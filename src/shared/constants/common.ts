import {VersioningType} from "@nestjs/common";

export const VALIDATION_PIPE_OPTIONS = {transform: true, whitelist: true};

export const API_VERSIONING_OPTIONS = {
    type: VersioningType.URI,
}