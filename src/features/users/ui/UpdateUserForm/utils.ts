import { UpdateAdminUserRequest, UserDetailResponse } from "@entities/user";
import { UpdateUserFormValidation } from "./types";

export const adaptDataForUpdateForm = (userDetail?: UserDetailResponse): Partial<UpdateUserFormValidation> => {
    return {
        firstName: userDetail?.profile.firstName,
        lastName: userDetail?.profile.lastName || "",
        patronymic: userDetail?.profile.patronymic || "",
        email: userDetail?.email,
        isActive: !!userDetail?.isActive,
        avatar: userDetail?.profile.avatar,
        additionalImage: userDetail?.profile.additionalImage,
    };
};

export const adaptUpdateUserRequest = (data: UpdateUserFormValidation): Omit<UpdateAdminUserRequest, "id"> => {
    const { additionalImage, avatar, ...rest } = data;
    return {
        ...rest,
        avatarId: avatar?.id,
        additionalImageId: additionalImage?.id,
    };
};
