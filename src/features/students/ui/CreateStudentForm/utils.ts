import { CreateUserRequest } from "@entities/user";
import { CreateStudentValidationFormRequest } from "./types";
export const getInitialValuesForm = (userRole: string): CreateStudentValidationFormRequest => {
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
        notifications: {
            homeworkChecked: false,
            groupAdded: false,
            supportMessage: false,
        },
    };
};

export const adaptCreateUserFormRequest = (values: CreateStudentValidationFormRequest): CreateUserRequest => {
    return {
        ...values,
        avatarId: values.avatar?.id,
        additionalImageId: values.additionalImage?.id,
        roleId: Number(values.roleId),
    };
};
