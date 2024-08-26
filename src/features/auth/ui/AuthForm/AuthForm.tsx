import { Box, BoxProps, Flex } from "@mantine/core";
import { FormikConfig } from "formik";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { Button, Checkbox, FInput, Form, Paragraph } from "@shared/ui";
import { $AuthFormValidationSchema, AuthFormValidationSchema, useFormStyles } from "@features/auth";
import { useAuthenticateMe } from "@entities/auth";
import { getPath } from "@features/auth/ui/utils";
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
                <Paragraph variant="small-semi" color="gray45">
                    Войдите в свой профиль, чтобы начать учиться
                </Paragraph>
                <Form config={config} disableOverlay>
                    <Flex direction="column">
                        <Flex direction="column" gap={8} mb={16}>
                            <FInput name="email" label="Email" />
                            <FInput name="password" label="Пароль" type="password" />
                        </Flex>
                        <Flex justify="space-between" mb={48} align="center">
                            <Checkbox color="green" label="Запомнить меня" />
                            <Link href={`${getPath()}?action=forgot-password`} className={classes.linkButton}>
                                <Button variant="text" className={classes.recoveryPasswordLink}>
                                    Забыли пароль?
                                </Button>
                            </Link>
                        </Flex>
                        <Flex direction="column" gap={16} ta="center" align="center" justify="center">
                            <Paragraph variant="small-m">Новый пользователь?</Paragraph>
                            <Link href={`${getPath()}?action=sign-up`} className={classes.linkButton}>
                                <Button variant="white" className={classes.signUpButton} size="medium" w={40}>
                                    Создать аккаунт
                                </Button>
                            </Link>
                        </Flex>
                    </Flex>
                    <Flex pos="absolute" bottom={24}>
                        <Button className={classes.signInButton} type="submit" variant="secondary" loading={isLoading || isSuccess}>
                            Войти
                        </Button>
                    </Flex>
                </Form>
            </Flex>
        </Box>
    );
};

export default AuthForm;
