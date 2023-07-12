import { Box, Flex, ThemeIcon } from "@mantine/core";
import { Shield } from "react-feather";
import { Button, FInput, ManagedForm } from "@shared/ui";
import { ChangePasswordResponse, authApi } from "@entities/auth";
import { $ChangePasswordFormValidationSchema, ChangePasswordFormData } from "@features/auth";
import { MutationKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";

export interface ChangePasswordFormProps {
    onClose: () => void;
}

const ChangePasswordForm = ({ onClose }: ChangePasswordFormProps) => {
    const changePassword = (values: ChangePasswordFormData) => {
        return authApi.changePassword({ oldPassword: values.oldPassword, ...values.newPasswords });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Новый пароль установлен",
            message: `Пароль успешно изменен`,
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
        <Box>
            <ManagedForm<ChangePasswordFormData, ChangePasswordResponse>
                initialValues={initialValues}
                validationSchema={$ChangePasswordFormValidationSchema}
                mutationKey={[MutationKeys.CHANGE_PASSWORD]}
                mutationFunction={changePassword}
                onSuccess={onSuccess}
                onError={onError}>
                <Flex direction="column" gap={16} mb={24}>
                    <FInput
                        name="oldPassword"
                        label="Введите старый пароль"
                        type="password"
                        icon={
                            <ThemeIcon color="gray45">
                                <Shield />
                            </ThemeIcon>
                        }
                    />
                    <FInput
                        name="newPasswords.password"
                        label="Придумайте новый пароль"
                        type="password"
                        icon={
                            <ThemeIcon color="gray45">
                                <Shield />
                            </ThemeIcon>
                        }
                        success
                        description="Пароль должен содержать не менее 8 символов, буквы латинского алфавита (a–z и A–Z), цифры (0–9). Не используйте пробел в пароле."
                    />
                    <FInput
                        name="newPasswords.passwordConfirmation"
                        label="Повторите новый пароль"
                        type="password"
                        icon={
                            <ThemeIcon color="gray45">
                                <Shield />
                            </ThemeIcon>
                        }
                        success="Пароли совпадают"
                    />
                </Flex>
                <Flex gap={8}>
                    <Button type="button" variant="border" fullWidth onClick={onClose}>
                        Отмена
                    </Button>
                    <Button type="submit" variant="secondary" fullWidth>
                        Сохранить
                    </Button>
                </Flex>
            </ManagedForm>
        </Box>
    );
};

export default ChangePasswordForm;
