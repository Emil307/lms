import { User, UpdateMeRequest } from "@entities/auth";

export const adaptDataForProfileEditForm = (user?: User): UpdateMeRequest => {
    return {
        firstName: user?.profile.data.firstName || "",
        lastName: user?.profile.data.lastName || "",
        patronymic: user?.profile.data.patronymic || "",
        email: user?.email || "",
        role: user?.role.data.displayName || "",
        avatar: user?.profile.data.avatar,
    };
};
