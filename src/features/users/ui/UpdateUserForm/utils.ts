import { UpdateAdminUserRequest, UserDetailResponse } from "@entities/user";
import { Roles } from "@app/routes";
import { UpdateUserFormValidation } from "./types";

export const adaptDataForUpdateForm = (userDetail?: UserDetailResponse): Partial<UpdateUserFormValidation> => {
    return {
        firstName: userDetail?.profile.firstName,
        lastName: userDetail?.profile.lastName || "",
        patronymic: userDetail?.profile.patronymic || "",
        email: userDetail?.email,
        isActive: !!userDetail?.isActive,
        description: userDetail?.profile.description || "",
        avatar: userDetail?.profile.avatar,
        additionalImage: userDetail?.profile.additionalImage,
    };
};

export const adaptUpdateUserRequest = (data: UpdateUserFormValidation): Omit<UpdateAdminUserRequest, "id"> => {
    const { additionalImage, avatar, description, ...rest } = data;
    return {
        ...rest,
        avatarId: avatar?.id,
        ...(data.roleId === String(Roles.teacher) && { description }),
        additionalImageId: additionalImage?.id,
    };
};
