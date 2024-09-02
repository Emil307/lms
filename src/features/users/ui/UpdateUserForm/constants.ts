import { Role } from "@shared/types";

export const getInitialValuesForm = (defaultRole: Role) => ({
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
    patronymic: "",
    description: "",
    isActive: false,
    roleId: String(defaultRole.id),
    roleName: defaultRole.name,
    avatar: null,
    additionalImage: null,
});
