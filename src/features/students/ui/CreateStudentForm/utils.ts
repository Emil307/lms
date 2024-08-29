import { CreateUserRequest } from "@entities/user";
import { Roles } from "@app/routes";
import { CreateStudentValidationFormRequest } from "./types";

export const adaptCreateUserFormRequest = (values: CreateStudentValidationFormRequest): CreateUserRequest => {
    return {
        ...values,
        roleId: Roles.student,
        avatarId: values.avatar?.id,
        additionalImageId: values.additionalImage?.id,
    };
};
