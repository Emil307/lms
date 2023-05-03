import { ChangePasswordFormValidationSchema } from "@features/users";
import { checkRoleOrder } from "@shared/utils";

export const getInitialValues = (updatedUserRoleId?: number, authUserRoleId?: number): ChangePasswordFormValidationSchema => {
    const isOldPassword = checkRoleOrder(authUserRoleId, updatedUserRoleId) < 1;
    return {
        isOldPassword,
        password: "",
        passwordConfirmation: "",
    };
};
