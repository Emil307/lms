import { UpdateUserRequest, UserDetailResponse } from "@entities/user";

export const adaptDataForEditForm = (userDetail?: UserDetailResponse): Partial<UpdateUserRequest> => {
    return {
        firstName: userDetail?.firstName,
        lastName: userDetail?.lastName,
        patronymic: userDetail?.patronymic,
        email: userDetail?.email,
        isActive: !!userDetail?.isActive,
    };
};
