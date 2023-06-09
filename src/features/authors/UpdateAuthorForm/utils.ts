import { AdminAuthor, UpdateAuthorRequest } from "@entities/author";
import { UpdateAuthorFormValidation } from "./types";

export const adaptDataForUpdateAuthorForm = (data?: AdminAuthor): Partial<UpdateAuthorFormValidation> => {
    return {
        firstName: data?.firstName,
        lastName: data?.lastName,
        patronymic: data?.patronymic || "",
        isActive: data?.isActive,
        description: data?.description || "",
        avatar: data?.avatar,
    };
};

export const adaptUpdateAuthorRequest = (params: UpdateAuthorFormValidation): Omit<UpdateAuthorRequest, "id"> => {
    const { avatar, ...rest } = params;

    return {
        ...rest,
        avatarId: avatar?.id || null,
    };
};
