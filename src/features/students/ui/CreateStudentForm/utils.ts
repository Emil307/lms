import { CreateUserRequest } from "@entities/user";
import { CreateStudentValidationFormRequest } from "./types";

export const adaptCreateUserFormRequest = (values: CreateStudentValidationFormRequest): Omit<CreateUserRequest, "roleId"> => {
    return {
        ...values,
        avatarId: values.avatar?.id,
        additionalImageId: values.additionalImage?.id,
    };
};
