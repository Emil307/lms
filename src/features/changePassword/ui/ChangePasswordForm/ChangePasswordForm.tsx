import { Box, Group, ThemeIcon } from "@mantine/core";
import { FormikConfig } from "formik";
import { Shield } from "react-feather";
import axios from "axios";
import { Button, FInput, Form } from "@shared/ui";
import { $changePasswordFormValidationSchema, ChangePasswordFormData } from "@features/changePassword";
import { useChangePassword } from "@entities/auth";

export interface ChangePasswordFormProps {
    onClose: () => void;
}

const ChangePasswordForm = ({ onClose }: ChangePasswordFormProps) => {
    const { mutate: changePassword } = useChangePassword();

    const config: FormikConfig<ChangePasswordFormData> = {
        initialValues: {
            oldPassword: "",
            newPasswords: {
                password: "",
                passwordConfirmation: "",
            },
        },
        validationSchema: $changePasswordFormValidationSchema,
        onSubmit: async (values, { setFieldError }) => {
            changePassword(
                { oldPassword: values.oldPassword, ...values.newPasswords },
                {
                    onError: (error) => {
                        if (axios.isAxiosError(error)) {
                            for (const errorField in error.response?.data.errors) {
                                if (["password", "passwordConfirmation"].includes(errorField)) {
                                    setFieldError(`newPasswords.${errorField}`, error.response?.data.errors[errorField][0]);
                                }
                                setFieldError(errorField, error.response?.data.errors[errorField][0]);
                            }
                        }
                    },
                }
            );
        },
    };

    return (
        <Box>
            <Form config={config} disableOverlay>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        marginBottom: 24,
                    }}>
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
                    <FInput
                        name="newPasswords.password"
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
                        name="newPasswords.passwordConfirmation"
                        label="Повторите новый пароль"
                        type="password"
                        icon={
                            <ThemeIcon color="gray45" variant="outline" sx={{ border: "none" }}>
                                <Shield />
                            </ThemeIcon>
                        }
                        success="Пароли совпадают"
                    />
                </Box>
                <Group sx={{ flexWrap: "nowrap" }}>
                    <Button type="button" variant="border" fullWidth onClick={onClose}>
                        Отмена
                    </Button>
                    <Button type="submit" variant="secondary" fullWidth>
                        Сохранить
                    </Button>
                </Group>
            </Form>
        </Box>
    );
};

export default ChangePasswordForm;
