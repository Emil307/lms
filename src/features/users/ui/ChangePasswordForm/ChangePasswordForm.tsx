import { Flex, ThemeIcon } from "@mantine/core";
import { Shield } from "react-feather";
import { FControlButtons, FInput, ManagedForm, PASSWORD_INPUT_DESCRIPTION } from "@shared/ui";
import { ChangeUserPasswordResponse, userApi } from "@entities/user";
import { MutationKeys } from "@shared/constant";
import { $changePasswordFormValidationSchema, ChangePasswordFormValidationSchema } from "@features/users";
import { useUserRole } from "@entities/auth/hooks";
import { ToastType, createNotification } from "@shared/utils";
import { getInitialValues } from "./utils";

export interface ChangeUserPasswordFormProps {
    userData: {
        id?: number;
        roleId?: number;
        fio?: string;
    };
    onClose: () => void;
}

const ChangeUserPasswordForm = ({ userData, onClose }: ChangeUserPasswordFormProps) => {
    const userRole = useUserRole();
    const changeUserPassword = ({ isOldPassword, ...values }: Omit<ChangePasswordFormValidationSchema, "id">) => {
        return userApi.updateUserPassword({ id: userData.id, ...values });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Новый пароль установлен",
            message: `Пароль пользователя "${userData.fio}" успешно изменен`,
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления пароля",
        });
    };

    return (
        <ManagedForm<Omit<ChangePasswordFormValidationSchema, "id">, ChangeUserPasswordResponse>
            initialValues={getInitialValues(userData.roleId, userRole?.id)}
            validationSchema={$changePasswordFormValidationSchema}
            mutationKey={[MutationKeys.CHANGE_USER_PASSWORD, userData.id]}
            mutationFunction={changeUserPassword}
            disableOverlay
            onSuccess={onSuccess}
            onError={onError}>
            {({ values }) => (
                <Flex direction="column" gap={24}>
                    <Flex direction="column" gap={16}>
                        {values.isOldPassword && (
                            <FInput
                                name="oldPassword"
                                label="Введите старый пароль"
                                type="password"
                                icon={
                                    <ThemeIcon color="neutralMain50">
                                        <Shield />
                                    </ThemeIcon>
                                }
                            />
                        )}
                        <FInput
                            name="password"
                            label="Придумайте новый пароль"
                            type="password"
                            icon={
                                <ThemeIcon color="neutralMain50">
                                    <Shield />
                                </ThemeIcon>
                            }
                            success
                            description={PASSWORD_INPUT_DESCRIPTION}
                        />
                        <FInput
                            name="passwordConfirmation"
                            label="Повторите новый пароль"
                            type="password"
                            icon={
                                <ThemeIcon color="neutralMain50">
                                    <Shield />
                                </ThemeIcon>
                            }
                            success="Пароли совпадают"
                        />
                    </Flex>
                    <FControlButtons cancelButtonText="Отмена" onClose={onClose} />
                </Flex>
            )}
        </ManagedForm>
    );
};

export default ChangeUserPasswordForm;
