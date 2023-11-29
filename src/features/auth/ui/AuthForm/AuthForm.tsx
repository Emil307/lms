import { Box, BoxProps, Flex, ThemeIcon } from "@mantine/core";
import { FormikConfig } from "formik";
import Link from "next/link";
import { AtSign, Shield } from "react-feather";
import axios from "axios";
import { Button, Checkbox, FInput, Form, Heading, Paragraph } from "@shared/ui";
import { Logo } from "@components/Logo";
import { $AuthFormValidationSchema, AuthFormValidationSchema, useFormStyles } from "@features/auth";
import { useAuthenticateMe } from "@entities/auth";
import { initialValues } from "./constants";

export interface AuthFormProps extends BoxProps {
    skipRedirectAfterAuth?: boolean;
    onSuccess?: () => void;
}

const AuthForm = ({ skipRedirectAfterAuth = false, onSuccess = () => undefined, ...boxProps }: AuthFormProps) => {
    const { classes } = useFormStyles();

    const { mutate: authenticate, isLoading, isSuccess } = useAuthenticateMe({ skipRedirect: skipRedirectAfterAuth });

    const config: FormikConfig<AuthFormValidationSchema> = {
        initialValues,
        validationSchema: $AuthFormValidationSchema,
        onSubmit: (values, { setFieldError }) => {
            authenticate(values, {
                onSuccess: () => {
                    onSuccess();
                },
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
        <Box className={classes.root} {...boxProps}>
            <Flex className={classes.inner}>
                <Link href="/" className={classes.logoLink}>
                    <Logo />
                </Link>
                <Heading order={3} ta="center">
                    Войдите в свой профиль, <br /> чтобы начать учиться
                </Heading>
                <Paragraph variant="text-small-m">
                    Новый пользователь?
                    <Link href="/auth/sign-up" className={classes.signUpLink}>
                        Создайте аккаунт
                    </Link>
                </Paragraph>
                <Form config={config} disableOverlay>
                    <Flex direction="column" gap={8} mb={16}>
                        <FInput
                            name="email"
                            label="Email"
                            icon={
                                <ThemeIcon color="gray45">
                                    <AtSign />
                                </ThemeIcon>
                            }
                        />
                        <FInput
                            name="password"
                            label="Пароль"
                            type="password"
                            icon={
                                <ThemeIcon color="gray45">
                                    <Shield />
                                </ThemeIcon>
                            }
                        />
                    </Flex>
                    <Flex justify="space-between" mb={24}>
                        <Checkbox label="Запомнить меня" />
                        <Link href="/auth/forgot-password" className={classes.recoveryPasswordLink}>
                            Забыли пароль?
                        </Link>
                    </Flex>
                    <Button type="submit" variant="secondary" size="large" w="100%" loading={isLoading || isSuccess}>
                        Войти
                    </Button>
                </Form>
            </Flex>
        </Box>
    );
};

export default AuthForm;
