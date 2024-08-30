import { Box, Flex } from "@mantine/core";
import { FormikConfig } from "formik";
import { useRouter } from "next/router";
import { Button, FInput, Form } from "@shared/ui";
import { $RecoveryPasswordFormValidationSchema, RecoveryPasswordFormData, useFormStyles } from "@features/auth";
import { useResetPassword } from "@entities/auth";
import { initialValues } from "./constants";

const RecoveryPasswordForm = () => {
    const router = useRouter();
    const { classes } = useFormStyles();
    const { mutate: resetPassword, isLoading } = useResetPassword();

    const config: FormikConfig<RecoveryPasswordFormData> = {
        initialValues: { ...initialValues, email: String(router.query.email), token: String(router.query.token) },
        validationSchema: $RecoveryPasswordFormValidationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setFieldError }) => {
            resetPassword(values, {
                onError: (error) => {
                    setFieldError("passwordConfirmation", error.response?.data.message);
                },
            });
        },
    };
    return (
        <Box className={classes.root}>
            <Flex className={classes.inner}>
                <Form config={config} disableOverlay>
                    <Flex direction="column" gap={16}>
                        <FInput
                            name="password"
                            label="Придумайте новый пароль"
                            type="password"
                            description="Пароль должен содержать не менее 8 символов, буквы латинского алфавита (a–z и A–Z), цифры (0–9). Не используйте пробел в пароле."
                        />
                        <FInput name="passwordConfirmation" label="Повторите новый пароль" type="password" success="Пароли совпадают" />
                        <FInput name="email" hidden />
                        <FInput name="token" hidden />
                    </Flex>
                    <Flex>
                        <Button className={classes.signInButton} type="submit" variant="primary" loading={isLoading}>
                            Сохранить
                        </Button>
                    </Flex>
                </Form>
            </Flex>
        </Box>
    );
};

export default RecoveryPasswordForm;
