import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import { FormikConfig } from "formik";
import Link from "next/link";
import { AtSign, Shield } from "react-feather";
import axios from "axios";
import { Button, Checkbox, FInput, Form } from "@shared/ui";
import { Logo } from "@components/Logo";
import { $authFormValidationSchema, AuthData, useFormStyles } from "@features/auth";
import { useAuthenticateMe } from "@entities/auth";

export interface AuthFormProps {}

const AuthForm = (_props: AuthFormProps) => {
    const { classes } = useFormStyles();
    const theme = useMantineTheme();

    const { mutate: authenticate, isLoading } = useAuthenticateMe();

    const config: FormikConfig<AuthData> = {
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: $authFormValidationSchema,
        onSubmit: (values, { setFieldError }) => {
            authenticate(values, {
                onError: (error) => {
                    if (axios.isAxiosError(error)) {
                        setFieldError("email", error.response?.data.message);
                        setFieldError("password", error.response?.data.message);
                    }
                },
            });
        },
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.inner}>
                <Link href="/" className={classes.logoLink}>
                    <Logo />
                </Link>

                <Text className={classes.headingTitle}>
                    Войдите в свой профиль, <br /> чтобы начать учиться
                </Text>
                <Text className={classes.headingDescription}>
                    Новый пользователь?
                    <Link href="/auth/sign-up" className={classes.signUpLink}>
                        Создайте аккаунт
                    </Link>
                </Text>
                <Form config={config} disableOverlay>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            marginBottom: 16,
                        }}>
                        <FInput name="email" label="Email" icon={<AtSign color={theme.colors.gray45[0]} />} />
                        <FInput name="password" label="Пароль" type="password" icon={<Shield color={theme.colors.gray45[0]} />} />
                    </Box>

                    <Group sx={{ justifyContent: "space-between", marginBottom: 24 }}>
                        <Checkbox label="Запомнить меня" />
                        <Link href="/auth/forgot-password" className={classes.recoveryPasswordLink}>
                            Забыли пароль?
                        </Link>
                    </Group>

                    <Button type="submit" variant="secondary" size="large" w="100%" loading={isLoading}>
                        Войти
                    </Button>
                </Form>
            </Box>
        </Box>
    );
};

export default AuthForm;
