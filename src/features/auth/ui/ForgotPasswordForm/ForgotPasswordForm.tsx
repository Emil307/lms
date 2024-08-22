import { Box, Flex } from "@mantine/core";
import { Button, FInput, ManagedForm, Paragraph } from "@shared/ui";
import { useFormStyles } from "@features/auth";
import { $RecoveryPasswordRequest, RecoveryPasswordRequest, RecoveryPasswordResponse, authApi } from "@entities/auth";
import { MutationKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import Link from "next/link";
import { getPath } from "@features/auth/ui/utils";
import React from "react";
const ForgotPasswordForm = () => {
    const { classes } = useFormStyles();
    const recoveryPassword = (values: RecoveryPasswordRequest) => {
        return authApi.recoveryPassword(values);
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Восстановление пароля",
            message: "Письмо отправлено на указанный email",
        });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка восстановления пароля",
        });
    };

    return (
        <Box className={classes.root}>
            <Flex className={classes.inner}>
                <Paragraph variant="small-semi" color="gray45">
                    Пришлем вам ссылку на восстановление пароля
                </Paragraph>
                <ManagedForm<RecoveryPasswordRequest, RecoveryPasswordResponse>
                    initialValues={initialValues}
                    validationSchema={$RecoveryPasswordRequest}
                    mutationKey={[MutationKeys.CHANGE_PASSWORD]}
                    mutationFunction={recoveryPassword}
                    onSuccess={onSuccess}
                    onError={onError}
                    disabledLoadingOnSuccess
                    disableOverlay>
                    {({ dirty, isLoading }) => {
                        return (
                            <Flex direction="column" gap={24}>
                                <FInput name="email" label="Email" />
                                <Flex direction="column" gap={16} ta="center" align="center" justify="center" mt={24} pb={20}>
                                    <Link href={`${getPath()}/?action=auth`}>
                                        <Button variant="text" className={classes.rememberPassword}>
                                            Вспомнили пароль?
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        variant="secondary"
                                        className={classes.signUpButton}
                                        size="medium"
                                        disabled={!dirty}
                                        loading={isLoading}>
                                        Войти
                                    </Button>
                                </Flex>
                            </Flex>
                        );
                    }}
                </ManagedForm>
                <Flex pos="absolute" bottom={24}>
                    <Link href={`${getPath()}?action=sign-up`}>
                        <Button variant="secondary" className={classes.signInButton}>
                            Создать аккаунт
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default ForgotPasswordForm;
