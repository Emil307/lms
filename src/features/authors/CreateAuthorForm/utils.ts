import { CreateAuthorRequest } from "@entities/author";
import { CreateAuthorFormValidation } from "./types";

export const adaptCreateAuthorRequest = (params: CreateAuthorFormValidation): CreateAuthorRequest => {
    const { avatar, ...rest } = params;

    return {
        ...rest,
        avatarId: avatar?.id || null,
    };
};
