import { User, UpdateMeRequest } from "@entities/auth";

export const adaptDataForProfileEditForm = (user?: User): UpdateMeRequest => {
    return {
        firstName: user?.data.profile.data.firstName || "",
        lastName: user?.data.profile.data.lastName || "",
        patronymic: user?.data.profile.data.patronymic || "",
        email: user?.data.email || "",
        role: user?.data.role.data.displayName || "",
        avatar: user?.data.profile.data.avatar,
    };
};
