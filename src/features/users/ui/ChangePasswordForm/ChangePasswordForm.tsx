import { Box, Group, ThemeIcon } from "@mantine/core";
import { FormikConfig } from "formik";
import { Shield } from "react-feather";
import { Button, FInput, Form } from "@shared/ui";
import { $changePasswordFormValidationSchema, ChangePasswordFormValidationSchema } from "@features/users";

export interface ChangePasswordFormProps {
    onClose: () => void;
}

const ChangePasswordForm = ({ onClose }: ChangePasswordFormProps) => {
    const config: FormikConfig<ChangePasswordFormValidationSchema> = {
        initialValues: {
            password: "",
            passwordConfirmation: "",
        },
        validationSchema: $changePasswordFormValidationSchema,
        onSubmit: () => {
            //TODO: на бекенде нет пока эндпоинта для этого
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
