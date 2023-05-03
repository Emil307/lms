import { UpdateUserRequest, UserDetailResponse } from "@entities/user";

export const adaptDataForEditForm = (userDetail?: UserDetailResponse): Partial<UpdateUserRequest> => {
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
