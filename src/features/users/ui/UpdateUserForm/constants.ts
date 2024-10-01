import { Role } from "@shared/types";

export const getInitialValuesForm = (defaultRole: Role) => ({
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
    patronymic: "",
    description: "",
    isActive: true,
    roleId: String(defaultRole.id),
    roleName: defaultRole.name,
    avatar: null,
    additionalImage: null,
});
