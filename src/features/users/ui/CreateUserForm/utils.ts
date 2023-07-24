import { CreateUserRequest } from "@entities/user";
import { CreateUserValidationFormRequest } from "./types";
import { Roles } from "@app/routes";

export const getInitialValuesForm = (userRole: string): CreateUserValidationFormRequest => {
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
            newHomework: false,
            supportMessage: false,
            invoiceForPayment: false,
        },
    };
};

export const getNotificationList = (roleId: string) => {
    if (roleId === Roles.teacher.toString()) {
        return ["newHomework"];
    }
    return ["newHomework", "supportMessage", "invoiceForPayment"];
};

export const adaptCreateUserFormRequest = (values: CreateUserValidationFormRequest): CreateUserRequest => {
    return {
        ...values,
        avatarId: values.avatar?.id,
        additionalImageId: values.additionalImage?.id,
        roleId: Number(values.roleId),
        notifications:
            values.roleId === Roles.teacher.toString()
                ? { newHomework: values.notifications.newHomework, supportMessage: false, invoiceForPayment: false }
                : values.notifications,
    };
};
