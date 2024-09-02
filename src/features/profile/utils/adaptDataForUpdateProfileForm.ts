import { User, UpdateMeForm } from "@entities/auth";

export const adaptDataForUpdateProfileForm = (user?: User): Partial<UpdateMeForm> => {
    return {
        firstName: user?.profile.firstName,
        lastName: user?.profile.lastName,
        patronymic: user?.profile.patronymic || "",
        email: user?.email,
        phone: user?.phone || "",
        roleId: user?.roles[0].id,
        roleName: user?.roles[0].name,
        avatar: user?.profile.avatar,
    };
};
