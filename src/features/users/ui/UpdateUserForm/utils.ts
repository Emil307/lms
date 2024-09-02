import { UpdateAdminUserRequest, UserDetailResponse } from "@entities/user";
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
        roleId: String(userDetail?.roles[0].id),
        roleName: userDetail?.roles[0].name,
    };
};

export const adaptUpdateUserRequest = (data: UpdateUserFormValidation, teacherRoleId?: number): Omit<UpdateAdminUserRequest, "id"> => {
    const { additionalImage, avatar, description, roleId, roleName, ...rest } = data;
    return {
        ...rest,
        avatarId: avatar?.id,
        roleId: Number(roleId),
        ...(data.roleId === teacherRoleId?.toString() && { description }),
        additionalImageId: additionalImage?.id,
    };
};
