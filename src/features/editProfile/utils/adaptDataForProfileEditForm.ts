import { GetMeResponse, UpdateMeRequest } from "@entities/auth";

export const adaptDataForProfileEditForm = (data?: GetMeResponse): UpdateMeRequest => {
    return {
        firstName: data?.profile.data.firstName || "",
        lastName: data?.profile.data.lastName || "",
        patronymic: data?.profile.data.patronymic,
        email: data?.email || "",
        role: data?.role.data.name || "",
        avatar: data?.profile.data.avatar,
    };
};
