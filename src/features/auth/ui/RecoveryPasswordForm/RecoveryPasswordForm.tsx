import { Box, Text, useMantineTheme } from "@mantine/core";
import { FormikConfig } from "formik";
import { ChevronLeft, Shield } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, FInput, Form } from "@shared/ui";
import { $RecoveryPasswordFormValidationSchema, RecoveryPasswordFormData, useFormStyles } from "@features/auth";
import { Logo } from "@components/Logo";
import { useResetPassword } from "@entities/auth";

export interface RecoveryPasswordFormProps {}

const RecoveryPasswordForm = (_props: RecoveryPasswordFormProps) => {
    const router = useRouter();
    const { classes } = useFormStyles();
    const theme = useMantineTheme();

    const { mutate: resetPassword, isLoading } = useResetPassword();

    const config: FormikConfig<RecoveryPasswordFormData> = {
        initialValues: {
            password: "",
            passwordConfirmation: "",
        },
        validationSchema: $RecoveryPasswordFormValidationSchema,
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
            <Box className={classes.inner}>
                <Link href="/" className={classes.logoLink}>
                    <Logo />
                </Link>
                <Text className={classes.headingTitle}>Восстановление пароля</Text>
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
                            icon={<Shield color={theme.colors.gray45[0]} />}
                            description="Пароль должен содержать не менее 8 символов, буквы латинского алфавита (a–z и A–Z), цифры (0–9). Не используйте пробел в пароле."
                        />
                        <FInput
                            name="passwordConfirmation"
                            label="Повторите новый пароль"
                            type="password"
                            icon={<Shield color={theme.colors.gray45[0]} />}
                            success="Пароли совпадают"
                        />
                    </Box>
                    <Button type="submit" variant="secondary" size="large" w="100%" loading={isLoading}>
                        Сохранить
                    </Button>
                </Form>
            </Box>
        </Box>
    );
};

export default RecoveryPasswordForm;
