import { Flex, ThemeIcon } from "@mantine/core";
import { Shield } from "react-feather";
import { Button, FInput, ManagedForm } from "@shared/ui";
import { usersApi } from "@entities/user";
import { MutationKeys } from "@shared/constant";
import { $changePasswordFormValidationSchema, ChangePasswordFormValidationSchema } from "@features/users";
import { useSession } from "@features/auth";
import { getInitialValues } from "./utils";

export interface ChangeUserPasswordFormProps {
    userData: {
        id?: number;
        roleId?: number;
    };
    onClose: () => void;
}

const ChangeUserPasswordForm = ({ userData, onClose }: ChangeUserPasswordFormProps) => {
    const { user } = useSession();
    const changeUserPassword = ({ isOldPassword, ...values }: Omit<ChangePasswordFormValidationSchema, "id">) => {
        return usersApi.changeUserPassword({ id: userData.id, ...values });
    };

    const onSuccess = () => {
        onClose();
    };

    return (
        <ManagedForm<Omit<ChangePasswordFormValidationSchema, "id">, void>
            initialValues={getInitialValues(userData.roleId, user?.roles[0].id)}
            validationSchema={$changePasswordFormValidationSchema}
            mutationKey={[MutationKeys.CHANGE_USER_PASSWORD, userData.id]}
            mutationFunction={changeUserPassword}
            onSuccess={onSuccess}>
            {({ dirty, values }) => (
                <Flex direction="column" gap={24}>
                    <Flex direction="column" gap={16}>
                        {values.isOldPassword && (
                            <FInput
                                name="oldPassword"
                                label="Введите старый пароль"
                                type="password"
                                icon={
                                    <ThemeIcon color="gray45" variant="outline" sx={{ border: "none" }}>
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
                                <ThemeIcon color="gray45" variant="outline" sx={{ border: "none" }}>
                                    <Shield />
                                </ThemeIcon>
                            }
                            success
                            description="Пароль должен содержать не менее 8 символов, буквы латинского алфавита (a–z и A–Z), цифры (0–9). Не используйте пробел в пароле."
                        />
                        <FInput
                            name="passwordConfirmation"
                            label="Повторите новый пароль"
                            type="password"
                            icon={
                                <ThemeIcon color="gray45" variant="outline" sx={{ border: "none" }}>
                                    <Shield />
                                </ThemeIcon>
                            }
                            success="Пароли совпадают"
                        />
                    </Flex>
                    <Flex gap={8}>
                        <Button variant="border" size="large" onClick={onClose} w="100%" maw={252}>
                            Отмена
                        </Button>
                        <Button type="submit" variant="secondary" size="large" w="100%" maw={252} disabled={!dirty}>
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>
            )}
        </ManagedForm>
    );
};

export default ChangeUserPasswordForm;
