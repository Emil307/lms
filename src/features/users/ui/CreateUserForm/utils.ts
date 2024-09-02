import { CreateUserRequest } from "@entities/user";
import { CreateUserValidationFormRequest } from "./types";

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

export const getNotificationList = (roleId: string, teacherRoleId?: number) => {
    if (roleId === teacherRoleId?.toString()) {
        return ["newHomework"];
    }
    return ["newHomework", "supportMessage", "invoiceForPayment"];
};

export const adaptCreateUserFormRequest = (values: CreateUserValidationFormRequest, teacherRoleId?: number): CreateUserRequest => {
    return {
        ...values,
        avatarId: values.avatar?.id,
        additionalImageId: values.additionalImage?.id,
        roleId: Number(values.roleId),
        notifications:
            values.roleId === String(teacherRoleId)
                ? { newHomework: values.notifications.newHomework, supportMessage: false, invoiceForPayment: false }
                : values.notifications,
    };
};
