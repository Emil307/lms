import { Box, Flex, ThemeIcon } from "@mantine/core";
import { FormikConfig } from "formik";
import { ChevronLeft, Shield } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, FInput, Form, Heading } from "@shared/ui";
import { $RecoveryPasswordFormValidationSchema, RecoveryPasswordFormData, useFormStyles } from "@features/auth";
import { Logo } from "@components/Logo";
import { useResetPassword } from "@entities/auth";
import { initialValues } from "./constants";

export interface RecoveryPasswordFormProps {}

const RecoveryPasswordForm = (_props: RecoveryPasswordFormProps) => {
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
    const handleClickBack = () => router.push("/auth/forgot-password");

    return (
        <Box className={classes.root}>
            <Button variant="white" className={classes.buttonBack} onClick={handleClickBack}>
                <ChevronLeft />
            </Button>
            <Flex className={classes.inner}>
                <Link href="/" className={classes.logoLink}>
                    <Logo />
                </Link>
                <Heading order={3}>Восстановление пароля</Heading>
                <Form config={config} disableOverlay>
                    <Flex direction="column" gap={16} mb={24}>
                        <FInput
                            name="password"
                            label="Придумайте новый пароль"
                            type="password"
                            icon={
                                <ThemeIcon color="gray45">
                                    <Shield />
                                </ThemeIcon>
                            }
                            description="Пароль должен содержать не менее 8 символов, буквы латинского алфавита (a–z и A–Z), цифры (0–9). Не используйте пробел в пароле."
                        />
                        <FInput
                            name="passwordConfirmation"
                            label="Повторите новый пароль"
                            type="password"
                            icon={
                                <ThemeIcon color="gray45">
                                    <Shield />
                                </ThemeIcon>
                            }
                            success="Пароли совпадают"
                        />
                        <FInput name="email" hidden />
                        <FInput name="token" hidden />
                    </Flex>
                    <Button type="submit" variant="secondary" size="large" w="100%" loading={isLoading}>
                        Сохранить
                    </Button>
                </Form>
            </Flex>
        </Box>
    );
};

export default RecoveryPasswordForm;
