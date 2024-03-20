import { UpdateAdminUserRequest, UserDetailResponse } from "@entities/user";
import { UpdateStudentFormValidation } from "./types";

export const adaptDataUpdateStudentForm = (data?: UserDetailResponse): Partial<UpdateStudentFormValidation> => {
    return {
        firstName: data?.profile.firstName,
        lastName: data?.profile.lastName || "",
        patronymic: data?.profile.patronymic || "",
        email: data?.email,
        phone: data?.phone || "",
        isActive: data?.isActive,
        avatar: data?.profile.avatar,
        roleId: data?.roles[0].id.toString(),
    };
};

export const adaptUpdateStudentRequest = (data: UpdateStudentFormValidation): Omit<UpdateAdminUserRequest, "id"> => {
    const { avatar, ...rest } = data;
    return {
        ...rest,
        avatarId: avatar?.id,
    };
};
