import { User, UpdateMeRequest } from "@entities/auth";

export const adaptDataForProfileEditForm = (user?: User): UpdateMeRequest => {
    return {
        firstName: user?.profile.firstName || "",
        lastName: user?.profile.lastName || "",
        patronymic: user?.profile.patronymic || "",
        email: user?.email || "",
        role: user?.roles?.[0].displayName || "",
        avatar: user?.profile.avatar,
    };
};
