import { CreateUserRequest } from "@entities/user";

export const getInitialValuesForm = (userRole: string): CreateUserRequest => {
    return {
        email: "",
        password: "",
        passwordConfirmation: "",
        firstName: "",
        lastName: "",
        patronymic: "",
        description: "",
        isActive: false,
        roleId: userRole,
        avatar: null,
        additionalImage: null,
    };
};
