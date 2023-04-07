import { GetMeResponse, UpdateMeRequest } from "@entities/auth";

export const adaptDataForProfileEditForm = (data?: GetMeResponse): UpdateMeRequest => {
    return {
        firstName: data?.profile.firstName || "",
        lastName: data?.profile.lastName || "",
        patronymic: data?.profile.patronymic,
        email: data?.email || "",
        role: data?.role.displayName || "",
        avatar: data?.profile.avatar,
    };
};
