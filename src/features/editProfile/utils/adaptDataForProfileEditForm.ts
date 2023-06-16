import { User, UpdateMeForm } from "@entities/auth";

export const adaptDataForProfileEditForm = (user?: User): Partial<UpdateMeForm> => {
    return {
        firstName: user?.profile.firstName,
        lastName: user?.profile.lastName,
        patronymic: user?.profile.patronymic || "",
        email: user?.email,
        role: user?.roles[0].displayName,
        avatar: user?.profile.avatar,
    };
};
