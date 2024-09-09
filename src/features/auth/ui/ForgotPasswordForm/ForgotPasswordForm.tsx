import { Box, Flex } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { Button, FInput, ManagedForm, Paragraph } from "@shared/ui";
import { useFormStyles } from "@features/auth";
import { $RecoveryPasswordRequest, RecoveryPasswordRequest, RecoveryPasswordResponse, authApi } from "@entities/auth";
import { MutationKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { getPath } from "@features/auth/ui/utils";
import { initialValues } from "./constants";
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
                            <>
                                <Flex direction="column" gap={24}>
                                    <FInput name="email" label="Email" />
                                    <Flex justify="flex-start" pb={20}>
                                        <Link href={`${getPath()}?action=sign-up`}>
                                            <Button variant="primary" className={classes.recoveryButton} disabled={!dirty}>
                                                Выслать
                                            </Button>
                                        </Link>
                                    </Flex>
                                </Flex>
                                <Flex
                                    direction="column"
                                    pos="absolute"
                                    bottom={92}
                                    gap={16}
                                    ta="center"
                                    align="center"
                                    justify="center"
                                    className={classes.absoluteButton}>
                                    <Link href={`${getPath()}?action=auth`}>
                                        <Button variant="text" className={classes.rememberPassword}>
                                            Вспомнили пароль?
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        variant="secondary"
                                        className={classes.signUpButton}
                                        size="medium"
                                        loading={isLoading}>
                                        Войти
                                    </Button>
                                </Flex>
                            </>
                        );
                    }}
                </ManagedForm>
            </Flex>
        </Box>
    );
};

export default ForgotPasswordForm;
