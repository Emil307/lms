import { GetMeResponse, UpdateMeRequest } from "@entities/auth";

export const adaptDataForProfileEditForm = (data?: GetMeResponse): UpdateMeRequest & { role: string } => {
    return {
        firstname: data?.profile.data.firstName || "",
        lastname: data?.profile.data.lastName || "",
        patronymic: data?.profile.data.patronymic,
        email: data?.email || "",
        role: data?.role.data.name || "",
        avatar: null,
    };
};
